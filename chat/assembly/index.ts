// The entry file of your WebAssembly module.

// export function add(a: i32, b: i32): i32 {
//   return a + b;
// }

import { Parameters, to_hex_string, log } from "../node_modules/smart-contract-as/assembly"


export function _contract_init(): void { }

const logs = Array.create<string>(50);

export function _contract_send_msg(): void {
  const params = Parameters.load();
  const message = params.string();

  if (message.length === 0 || message.length > 240) return; // throw error?

  const sender_as_string = to_hex_string(params.sender_id);  // otherwise array of bytes

  if (logs.length === 50) {
    logs.shift()
  }

  logs.push("<" + sender_as_string + ">" + message);


}

export function _contract_get_msg(): void {
  for (let i = 0; i < logs.length; i++) {
    log(logs[i]);
  }

}