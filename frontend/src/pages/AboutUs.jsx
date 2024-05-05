import React from "react";
import Image from "../assets/BackgroundMain4.jpg";

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-full  mx-auto px-8 py-12 bg-white rounded-lg shadow-lg flex items-center mb-8">
        <div className="w-1/2 mr-8">
          <img src={Image} alt="Square Image" className="rounded-full" />
        </div>

        <div className="w-1/2">
          <h1 className="text-3xl font-semibold mb-4">
            About Vinco ice cream and wafers pvt ltd
          </h1>
          <p className="text-lg">
            Welcome to Vinco ice cream and wafers pvt Ltd, where delicious
            treats meet innovation. Founded in 2010 by Mr. Mohanarave, our
            journey began with a simple vision: to bring joy to Matale and
            beyond through irresistible ice creams and cones.
          </p>{" "}
          <br />
          <h2 className="text-3xl font-semibold mb-4">Our Journey</h2>
          <p className="text-lg">
            Starting with just five employees, we focused on crafting quality
            ice popsicles and ice creams to serve the wholesale and retail
            markets in Matale. Today, with over 35 dedicated employees, we've
            expanded our offerings to include a wide range of flavors, catering
            to wholesalers, retailers, and customers island-wide.
          </p>{" "}
          <br />
          <h2 className="text-3xl font-semibold mb-4">Our Passion</h2>
          <p className="text-lg">
            At VINO, we're driven by a commitment to quality, innovation, and
            customer satisfaction. From our humble beginnings to our present
            success, we've remained true to our core values, delivering timely
            deliveries, reasonable prices, and top-notch service.
          </p>{" "}
          <br />
          <h2 className="text-3xl font-semibold mb-4">Our Founder</h2>
          <p className="text-lg">
            Mr. Mohanarave's journey from accountant to entrepreneur is a
            testament to his determination and vision. Sacrificing his job and
            putting his home on the line, he pursued his dream of creating
            something truly special—an ice cream empire that would make Matale
            proud.
          </p>{" "}
          <br />
          <h2 className="text-3xl font-semibold mb-4">Our Challenges</h2>
          <p className="text-lg">
            Overcoming obstacles is part of our story. From securing initial
            capital to convincing utilities to provide industrial electricity,
            we've faced challenges head-on, emerging stronger and more
            resilient.
          </p>{" "}
          <br />
          <h2 className="text-3xl font-semibold mb-4">Our Unique Offering</h2>
          <p className="text-lg">
            Our commitment to innovation is evident in our product design.
            Through research and creativity, we've developed unique cone molds
            that maximize ice cream enjoyment while minimizing waste, setting us
            apart in the market. Join us on our journey as we continue to
            delight taste buds, innovate, and spread joy—one scoop at a time.
          </p>{" "}
          <br />
        </div>
      </div>

      <div className="max-w-full mx-auto px-8 py-12 bg-white rounded-lg shadow-lg flex justify-center">
        <img src={Image} alt="Rectangle Image" className="w-full" />
      </div>
    </div>
  );
};

export default AboutUs;
