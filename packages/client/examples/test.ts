import { SolanaClient } from "./utils/client";

const checkAccount = async () => {
  const signer = await SolanaClient.getDefaultSigner();

  const accountInfo = await SolanaClient.getAccountInfo(signer.address);

  console.log(accountInfo);
};

checkAccount();
