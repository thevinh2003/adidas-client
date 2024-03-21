import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Paypal from "../components/Paypal/Paypal";
import cartAPI from "../apis/cartAPI";
import voucherAPI from "../apis/voucherAPI";
import orderAPI from "../apis/orderAPI";
import authAPI from "../apis/authAPI";


function formatCurrencyVND(number: number) {
	return new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: "VND",
	}).format(number);
}

const validate = (value:any) => {
  return value === '' ? 'Trường này không được để trống' : ''
}

const initErrror = {
  methodPayment: '',
  shippingMethod: '',
  shippingAddress: '',
}

function PayScreen() {
  const [methodPayment, setMethoPayment] = useState('')
  const [shippingAddress, setShippingAddress] = useState('')
  const [shippinMethod, setShippinMethod] = useState<any>('Tiet Kiem')
  const [products, setProducts] = useState<any>()
  const [vouchers, setVouchers] = useState<any>()
  const [user, setUser] = useState<any>()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [totalMoney, setTotalMoney] = useState(0)
  const [stateVoucher, setStateVoucher] = useState<any>('')
  const [fee, setFee] = useState(30000)
  const [voucherValue, setVoucherValue] = useState<any>('')
  const [errors, setErrors] = useState<any>(initErrror)

  useEffect(() => {
    const handle = async () => {
      // const data = await productAPI.getProductByArrId(params.get('productId'))
      const data = await cartAPI.getCartProductByUser(params.get('productId'))
      const dataVoucher = await voucherAPI.getAllVoucher()
      const user = await authAPI.getCurrentUser();
      if (data) {
        setProducts(data)
      }
      if (dataVoucher) {
        setVouchers(dataVoucher)
      }
      if (user) {
        setUser(user?._user)
        if (user?._user.Address) {
          setShippingAddress(user?._user.Address)
        }
      }
    }
    handle()
  }, [params])

  useEffect(() => {
    if (products) {
      let total = 0
      products?.Products?.map((item: any) => {
        total += +item?.Price * +item?.CartDetail?.Quantity
      })
      setTotalMoney(total)
    }
  }, [products])

  useEffect(() => {
    if (shippinMethod === 'Nhanh') {
      setFee(50000)
    }
    else if (shippinMethod === 'Tiet kiem') {
      setFee(30000)
    }
  }, [shippinMethod])

  useEffect(() => {
    if (stateVoucher) {
      let value = 0
      vouchers?.vouchers?.map((item: any) => {
        if (item?.id === +stateVoucher) {
          value = item?.VoucherValue
        }
      })
      setVoucherValue(value)
    }
    else if (stateVoucher === 'None') {
      setVoucherValue(0)
    }
  }, [stateVoucher, vouchers])

  const handlePayment = async () => {
    const error = {
      methodPayment: '',
      shippingMethod: '',
      shippingAddress: '',
    }
    const errMeodPayment = validate(methodPayment)
    const errShippinMethod = validate(shippinMethod)
    const errAddress = validate(shippingAddress)
    if (errMeodPayment || errShippinMethod || errAddress) {
      error.methodPayment = errMeodPayment
      error.shippingMethod = errShippinMethod
      error.shippingAddress = errAddress
      setErrors(error)
    }
    else {
      setErrors({})
    }
    
    if (Object.keys(errors).length === 0 && errMeodPayment === '' && errShippinMethod === '' && errAddress === '') {
      const orders = { 
        totalAmount: totalMoney+fee - totalMoney*(voucherValue/100),
        voucherId: stateVoucher === 'none' || stateVoucher === '' ? 1 : stateVoucher,
        paymentMethod: methodPayment,
        shippingAddress: shippingAddress,
        shippingMethods: shippinMethod,
        shippingcost: fee
      }
      const product = [...products?.Products]
      const res = await orderAPI.createOrder({orders, products: product})
      if (res?.errCode === 1) {
        alert(res?.message)
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
      else {
        setTimeout(() => {
          window.location.reload();
        }, 500);
        navigate('/follow')
      }
    }
  }

  return (
    <div>
      {/* <Navbar /> */}
      <div className="flex justify-center mb-5 mt-5">
        <h2 className="text-lg font-bold">Thanh toán</h2>
      </div>
      <div className="border rounded-md p-4">
        <h3 className="text-base font-bold">Chọn thông tin giao hàng</h3>
        <div className="flex flex-col mt-4">
          <label className="mb-2">Họ tên:</label>
          <input 
            type="text" id="name" 
            className="border rounded-md p-2" 
            value={user?.FullName}
          />
        </div>
        <div className="flex flex-col mt-4">
          <label className="mb-2">Địa chỉ:</label>
          <textarea
            id="address"
            className="border rounded-md p-2"
            value={shippingAddress}
            onChange={(e) => {
              setShippingAddress(e.target.value)
              setErrors({})
            }}
          ></textarea>
           {
            errors && errors.shippingAddress ? 
            <span className="text-red-500">{errors.shippingAddress}</span>
            : ''
          }
        </div>
      </div>
      <div className="border rounded-md p-4">
        <h3 className="text-base font-bold">Sản phẩm</h3>
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th className="text-left">Thông tin sản phẩm</th>
              <th className="text-right">Số lượng</th>
              <th className="text-right">Đơn giá</th>
            </tr>
          </thead>
          <tbody>
            {
              products?.Products?.map((item: any, index: number) => {
                return (
                  <tr>
                    <td>
                      <div>{item?.ProductName}</div>
                      <img src={item?.PhotoLink} width={200} height={50} alt="product" />
                    </td>
                    <td className="text-right">{item?.CartDetail?.Quantity}</td>
                    <td className="text-right">{formatCurrencyVND(item?.Price)}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      <h3 className="text-base font-bold">Các lựa chọn thanh toán</h3>
      <div className=" flex border rounded-md p-4 justify-around">
        <div className="flex flex-col mt-4 ">
          <label className="mb-2">Phương thức thanh toán:</label>
          <select
            id="payment-method"
            className="border rounded-md p-2"
            defaultValue=''
            onChange={(e) => {
              setMethoPayment(e.target.value)
              setErrors({})
            }}
          >
            <option value="" disabled>
              Chọn
            </option>
            <option value="cod">Thanh toán khi đã nhận hàng (COD)</option>
            <option value="paypal">Thanh toán bằng paypal</option>
          </select>
          {
            errors && errors.methodPayment ? 
            <span className="text-red-500">{errors.methodPayment}</span>
            : ''
          }
        </div>
        <div className="flex flex-col mt-4">
          <label className="mb-2">Cách thức vận chuyển</label>
          <select
            id="payment-method"
            className="border rounded-md p-2"
            onChange={e => {
              setShippinMethod(e.target.value)
              setErrors({})
            }}
          >
            {/* <option value="" disabled>
              Chọn
            </option> */}
            <option value="Tiet kiem">
              Giao hàng tiết kiệm <span>30.000đ</span>
            </option>
            <option value="Nhanh">
              Giao hàng nhanh <span>50.000đ</span>
            </option>
          </select>
          {
            errors && errors.shippingMethod ? 
            <span className="text-red-500">{errors.shippingMethod}</span>
            : ''
          }
        </div>
        <div className="flex flex-col mt-4">
          <label className="mb-2">Mã giảm giá</label>
          <select
            id="payment-method"
            className="border rounded-md p-2"
            defaultValue=''
            onChange={(e) => setStateVoucher(e.target.value)}
          >
            <option value="" disabled>
              Chọn
            </option>
            {
              vouchers?.vouchers?.map((item: any, index: number) => (
              <option value={item.id}>
                {item?.VoucherName} (giảm<span> {item?.VoucherValue}%)</span>
              </option>
              ))
            }
            <option value="none">
              None
            </option>
          </select>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p>
          Tổng tiền hàng : <span>{formatCurrencyVND(totalMoney)}</span>
        </p>
        <div>
          <p>
            Phí giao hàng : <span>{formatCurrencyVND(fee)}</span>
          </p>
          <p>
            Giảm giá : <span>{voucherValue}%</span>
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <h3 className="text-lg font-bold">Tổng thanh toán:</h3>
        <span className="text-lg font-bold">{formatCurrencyVND(totalMoney+fee - totalMoney*(voucherValue/100))}</span>
      </div>
      <div className="flex justify-between">
        <div>
          {
            methodPayment === 'paypal' ?
              <Paypal 
                errors={errors}
                amount={((totalMoney+fee - totalMoney*(voucherValue/100))/23000).toFixed(2)} 
                orders={{ 
                  totalAmount: totalMoney+fee - totalMoney*(voucherValue/100),
                  voucherId: stateVoucher === 'none' || stateVoucher === '' ? 1 : stateVoucher,
                  paymentMethod: methodPayment,
                  shippingAddress: shippingAddress,
                  shippingMethods: shippinMethod,
                  shippingcost: fee
                }} 
                products={products?.Products}
              />
              :
              <button 
                className=" bg-black text-white hover:opacity-70 rounded-lg px-8 py-3 font-semibold mx-auto text-xl w-1/7 mb-4 cursor-pointer"
                onClick={() => handlePayment()}
              >
                Thanh toán
              </button>
            }
        </div>
        <p>Nhấn "Thanh toán" đồng nghĩa với việc bạn đã mua hàng</p>
      </div>
      {/* <Contact /> */}
      {/* <Footer /> */}
    </div>
  );
}

export default PayScreen;
