//Handling BatchID Errors

export const handleBatchIDChange = (e, setBatchID, toast) => {
  setBatchID(e.target.value);
};

export const handleBatchIDBlur = (e, toast) => {
  const value = e.target.value;

  if (value.trim() === "") {
    toast.error("Batch ID cannot be blank");
  } else if (!value.startsWith("B") && !value.startsWith("b")) {
    toast.error("Batch ID must start with 'B'");
  }
};

//Handling BatchName Errors

export const handleBatchNameChange = (e, setBatchName) => {
  setBatchName(e.target.value);
};

export const handleBatchNameBlur = (e, toast) => {
  const value = e.target.value;
  // Check if BatchName is blank
  if (value.trim() === "") {
    toast.error("BatchName cannot be blank");
  }
};
