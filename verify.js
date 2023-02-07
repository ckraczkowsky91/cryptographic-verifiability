const verifySignature = async() => {
  require("dotenv").config();
  const { ethers } = require("ethers");
  const { hashMessage } = require("@ethersproject/hash");
  const { API_URL, PRIVATE_KEY } = process.env;
  const provider = new ethers.AlchemyProvider("goerli", API_URL);

  const message = "Let's verify the signature of this message!";
  const walletInst = new ethers.Wallet(PRIVATE_KEY, provider);
  const signature = walletInst.signMessage(message);
  console.log('sig', signature);

  const messageSigner = signature.then((value) => {
    const verifySigner = ethers.recoverAddress(hashMessage(message),value);
    return verifySigner;
  });

  try {
    console.log("Success! The message: " + message +" was signed with the signature: " + await signature);
    console.log("The signer was: " + await messageSigner);
  } catch (err) {
    console.log("Something went wrong while verifying your message signature: " + err);
  }
};

 verifySignature();
