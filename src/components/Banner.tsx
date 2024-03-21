import React from "react";

const Banner = () => {
	return (
		<div className="w-full h-full">
			<video
				autoPlay
				loop
				muted
				className="relative w-full h-full -z-10"
			>
				<source
					src={"https://videos.adidas.com/video/upload/if_w_gt_1920,w_1920/running_ss24_supernova_global_launch_hp_masthead_d_2ddca3b2e2.mp4"}
					type="video/mp4"
				/>
			</video>
			{/* text on video */}
			<div className="mx-auto absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] flex flex-col items-center">
				<p className="text-white text-center text-3xl font-bold">SUPERCOMFORT .</p>
				<p className="text-white text-center my-4">Trải nghiệm cảm giác thoải mái tối đa với giày Adidas.</p>
				<button className="bg-white rounded-lg px-8 py-3 font-semibold mx-auto text-xl">Khám phá</button>
			</div>
		</div>
	);
};

export default Banner;
