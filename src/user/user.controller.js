export const userLogin = (req, res) => {
  res.send(`User Post login email ${req.body.email}`);
};
export const userVerifyHash = (req, res) => {
  res.send(`User POST Verify hash: ${req.body.hash}`);
};

export const userVerifyOTP = (req, res) => {
  res.send(`User POST Verify hash ${req.body.hash} and OTP ${req.body.otp}`);
};

export const userCreate = (req, res) => {
  res.send(
    `User POST Create Profile Input take Oracle ID ${req.body.oracleId} and Carreir Stage ${req.body.careerStage} and Capebility: ${req.body.primaryCapability}`
  );
};
