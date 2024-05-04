const Product = require("../models/product.model");
const nodemailer = require("nodemailer");
require("dotenv").config({ path: "../.env" });

//Establishing connection to the Email

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  //port: 587 ,
  //secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD,
  },
});

// verify connection configuration

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});

//View All Products

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//View a Product based on the Batch ID

const getOneProduct = async (req, res) => {
  try {
    const { batchID } = req.params;
    const product = await Product.findOne({ batchID: batchID });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Creating a Product

const addProduct = async (req, res, next) => {
  try {
    const {
      batchID,
      batchName,
      overallScore,
      receivedDate,
      quantity,
      intensity,
      aroma,
      sweetness,
      aftertaste,
      consistency,
      appearence,
      packageQuality,
      melting,
    } = req.body;

    // Check if batch ID already exists
    const existingProduct = await Product.findOne({ batchID });
    if (existingProduct) {
      return res.status(409).json({ error: "Batch ID already exists" });
    }

    // Check if batch ID starts with 'B' or 'b' and has 4 digits following
    if (!/^B\d{4}$/i.test(batchID)) {
      return res
        .status(410)
        .json({ error: "Batch ID must start with 'B' followed by 4 digits" });
    }

    // Check if batch Name is Empty
    if (batchName.trim() === "") {
      return res.status(411).json({ error: "Batch Name cannot be Empty" });
    }

    // If the overall score is less than 64, send an email notification

    if (overallScore < 64) {
      let emailText = `Dear User,\n\nWe regret to inform you that the Quality batch with ID ${batchID} received on ${receivedDate} with a Quantity of ${quantity} was noted with an Overall Score of ${overallScore}. 
      \n\nAs per our standards, a minimum Overall Score of 64 is required to ensure optimal quality and customer satisfaction.
      \n\nAs a result, the quality batch ${batchID} has been Rejected. Please see below for specific areas in which the Batch fell short.\n\n`;

      // Check individual criteria and add to email text if less than 8

      if (intensity < 8)
        emailText += `\n- Low Intensity of Flavor: ${intensity}`;
      if (aroma < 8) emailText += `\n- Low Aroma Strength: ${aroma}`;
      if (sweetness < 8)
        emailText += `\n- Low Balance of Sweetness: ${sweetness}`;
      if (aftertaste < 8) emailText += `\n- Low Aftertaste: ${aftertaste}`;
      if (consistency < 8)
        emailText += `\n- Low Consistency and Texture: ${consistency}`;
      if (appearence < 8) emailText += `\n- Low on Appearence: ${appearence}`;
      if (packageQuality < 8)
        emailText += `\n- Low Package Quality: ${packageQuality}`;
      if (melting < 8) emailText += `\n- Low Resistance to Melting: ${melting}`;

      emailText += `\n\n\n Thanks and Regards,\n\n Quality Management Unit\n Vino Icecream Co plc`;

      await transporter.sendMail({
        from: process.env.USER,
        to: process.env.USER,
        subject: `Batch ${batchID} - ${batchName} Rejection - Low Overall Score Notification`,
        text: emailText,
      });
    }

    // If everthing is ok, proceed with creating the product

    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update a Product

const updateProduct = async (req, res) => {
  try {
    const { batchID } = req.params;
    const { batchName, quantity } = req.body;

    //Check whether the Batch Name is Empty

    if (!batchName || batchName.trim() === "") {
      return res.status(411).json({ message: "Batch name is required" });
    }

    //Checking whether the Quantity is greater than 0

    if (quantity <= 0) {
      return res
        .status(412)
        .json({ message: "Quantity must be greater than 0" });
    }

    const product = await Product.findOneAndUpdate(
      { batchID: batchID },
      req.body
    );

    //Checking Whether theres products (mostly for backend and error handling)

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await Product.findOne({ batchID: batchID });

    //Getting new overall score and Dates

    const newOverallScore = updatedProduct.overallScore;

    const receivedDate = new Date(updatedProduct.receivedDate);
    const formattedReceivedDate = `${receivedDate
      .getDate()
      .toString()
      .padStart(2, "0")}/${(receivedDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${receivedDate.getFullYear()}`;

    // Get today's date

    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(
      today.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${today.getFullYear()}`;

    //If overall Score is less than 64, Notifying user via Mail

    if (newOverallScore < 64) {
      let emailText = `Dear User,\n\nWe regret to inform you that the Quality batch with ID ${updatedProduct.batchID} received on ${formattedReceivedDate} with a Quantity of ${updatedProduct.quantity} was Updated on ${formattedDate} which resulted an Overall Score of ${newOverallScore}. 
      \n\nAs per our standards, a minimum Overall Score of 64 is required to ensure optimal quality and customer satisfaction.
      \n\nAs a result, the quality batch ${updatedProduct.batchID} has been Rejected. Please see below for specific areas in which the Batch fell short after the Update.\n\n`;

      // Check individual criteria and add to email text if less than 8

      if (updatedProduct.intensity < 8)
        emailText += `\n- Low Intensity of Flavor: ${updatedProduct.intensity}`;
      if (updatedProduct.aroma < 8)
        emailText += `\n- Low Aroma Strength: ${updatedProduct.aroma}`;
      if (updatedProduct.sweetness < 8)
        emailText += `\n- Low Balance of Sweetness: ${updatedProduct.sweetness}`;
      if (updatedProduct.aftertaste < 8)
        emailText += `\n- Low Aftertaste: ${updatedProduct.aftertaste}`;
      if (updatedProduct.consistency < 8)
        emailText += `\n- Low Consistency and Texture: ${updatedProduct.consistency}`;
      if (updatedProduct.appearence < 8)
        emailText += `\n- Low on Appearence: ${updatedProduct.appearence}`;
      if (updatedProduct.packageQuality < 8)
        emailText += `\n- Low Package Quality: ${updatedProduct.packageQuality}`;
      if (updatedProduct.melting < 8)
        emailText += `\n- Low Resistance to Melting: ${updatedProduct.melting}`;

      emailText += `\n\n\n Thanks and Regards,\n\n Quality Management Unit\n Vino Icecream Co plc`;

      await transporter.sendMail({
        from: process.env.USER,
        to: process.env.USER,
        subject: `Batch ${updatedProduct.batchID} - ${updatedProduct.batchName}  Rejection - Low Overall Score Notification`,
        text: emailText,
      });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete a Product

const deleteProduct = async (req, res) => {
  try {
    const { batchID } = req.params;

    const product = await Product.findOneAndDelete({ batchID: batchID });

    //Checking Whether theres products (mostly for backend and error handling)

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Parse receivedDate string into a Date object

    const receivedDate = new Date(product.receivedDate);

    // Get date components

    const day = receivedDate.getDate().toString().padStart(2, "0");
    const month = (receivedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = receivedDate.getFullYear();

    // Format date as DD/MM/YYYY

    const formattedReceivedDate = `${day}/${month}/${year}`;

    // Get today's date

    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(
      today.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${today.getFullYear()}`;

    //Email content and transporter

    let emailTextDelete = `Dear User,\n\n
    This is to keep you informed that the Quality Batch with ID ${batchID} has been successfully Deleted from the records on ${formattedDate}.\n\n
    Please refer Deleted Batch Record details below for Record Keeping Purposes.
    \n\n-BatchID: ${batchID}
    \n-Batch Name: ${product.batchName}
    \n-Batch Received Date: ${formattedReceivedDate}
    \n- Quantity: ${product.quantity}
    \n-Overall Score: ${product.overallScore}
    \n\n- Intensity of Flavor: ${product.intensity}
    \n- Aroma Strength: ${product.aroma}
    \n- Balance of Sweetness: ${product.sweetness}
    \n- Aftertaste: ${product.aftertaste}
    \n- Consistency and Texture: ${product.consistency}
    \n- Appearence: ${product.appearence}
    \n- Package Quality: ${product.packageQuality}
    \n- Resistance to Melting: ${product.melting}
    \n\n\nThanks and Regards,\n\nQuality Management Unit\nVino Icecream Co plc`;

    await transporter.sendMail({
      from: process.env.USER,
      to: process.env.USER,
      subject: `Batch ${batchID} - ${product.batchName} Deletion - Notification`,
      text: emailTextDelete,
    });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Generating a Report function

const generateReport = async (req, res) => {
  try {
    let query = {};

    //Filtering Data based on entered date range

    if (req.query.startDate && req.query.endDate) {
      query.receivedDate = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate),
      };
    }

    if (req.query.status) {
      // Adjust the query to filter by status
      query.status = req.query.status;
    }

    const reportData = await Product.find(query);

    res.status(200).json(reportData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Exporting Modules

module.exports = {
  getProducts,
  getOneProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  generateReport,
};
