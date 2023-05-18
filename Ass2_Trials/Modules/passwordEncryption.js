import sodium from "https://deno.land/x/sodium@0.2.0/basic.ts";

await sodium.ready;

function checkPassword(original, comparision){

    const matches = sodium.crypto_pwhash_str_verify(
        original,
        comparision,
      );
    
      if (!matches) {
        console.log("Incorrect password");
        return false;
      } else {
        console.log(`Password matches!`);
        return true;
      }
}

function encryptPassword(input){
    const hash = sodium.crypto_pwhash_str(input,
    sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
    sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE);
    return hash;
}

export{ checkPassword, encryptPassword};