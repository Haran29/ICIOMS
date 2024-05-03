//Handling BatchID Errors

export const handleBatchIDChange = (e, setBatchID, toast) => {
  // Capitalize the first letter of the batch ID
  const newValue =
    e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
  setBatchID(newValue);
};

//Checking BatchID requirements using blur effect (after component has been interacted with).

export const handleBatchIDBlur = (e, toast) => {
  const value = e.target.value;

  if (value.trim() === "") {
    toast.error("Batch ID cannot be blank", {
      className: "bg-red-500 text-white font-bold mt-13",
    });
  } else if (!/^B\d{4}$/i.test(value)) {
    toast.error("Batch ID must start with 'B' followed by 4 digits", {
      className: "bg-red-500 text-white font-bold mt-13",
    });
  }
};

//Handling BatchName Errors

export const handleBatchNameChange = (e, setBatchName) => {
  const newValue = e.target.value
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  setBatchName(newValue);
};

//Checking Batch Name requirements using blur effect (after component has been interacted with).

export const handleBatchNameBlur = (e, toast) => {
  const value = e.target.value;
  // Check if BatchName is blank
  if (value.trim() === "") {
    toast.error("BatchName cannot be blank", {
      className: "bg-red-500 text-white font-bold mt-13",
    });
  }
};

//Handling ReceivedDate Errors

export const handleDateChange = (e, setReceivedDate) => {
  setReceivedDate(e.target.value);
};

export const handleReceivedDateBlur = (e, toast) => {
  const enteredDate = new Date(e.target.value);
  const today = new Date();

  if (enteredDate > today) {
    toast.error("Date cannot be greater than today's date", {
      className: "bg-red-500 text-white font-bold mt-13",
    });
  }
};

export const checkReceivedDate = (receivedDate, toast) => {
  const currentDate = new Date().toISOString().split("T")[0];

  // Check if the receivedDate is empty
  if (!receivedDate) {
    toast.error("Received date cannot be empty", {
      className: "bg-red-500 text-white font-bold mt-13",
    });
    return true; // Indicate that an error occurred
  }

  // Check if the receivedDate is greater than the current date
  if (receivedDate > currentDate) {
    toast.error("Received date cannot be greater than the current date", {
      className: "bg-red-500 text-white font-bold mt-13",
    });
    return true; // Indicate that an error occurred
  }

  return false; // Indicate no error
};

//Handling Quanitity Errors

export const checkQuantity = (quantity, toast) => {
  if (quantity <= 0) {
    toast.error("Quantity cannot be 0 or less than 0", {
      className: "bg-red-500 text-white font-bold mt-13",
    });
    return true; // Indicate that an error occurred
  }
  return false; // Indicate no error
};