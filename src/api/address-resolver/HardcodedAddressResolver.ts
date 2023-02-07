import { BaseProvider } from "@ethersproject/providers";
import { IAddressResolver } from "./address-resolver";

type HardcodedAddressMap = Record<string, string | undefined>;

export class HardcodedAddressResolver implements IAddressResolver<string> {
  async resolveAddress(
    provider: BaseProvider,
    address: string
  ): Promise<string | undefined> {
    try {
      const addressMap: HardcodedAddressMap = await import(
        `./hardcoded-addresses/${provider.network.chainId}.json`
      );
      // @ts-ignore
      return addressMap.default[address];
    } catch (err) {
      // Ignore on purpose
      return undefined;
    }
  }
}
