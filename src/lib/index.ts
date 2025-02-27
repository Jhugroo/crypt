import cjs from 'crypto-js';
class StringEncryptor {
	private passphrase: string | undefined;

	constructor() {}
	setPassPhrase(passphrase: string) {
		this.passphrase = passphrase;
	}
	encrypt(text: string): string {
		if (!this.passphrase) {
			throw new Error('Passphrase not set');
		}
		return cjs.AES.encrypt(text, this.passphrase).toString();
	}

	decrypt(encryptedText: string): string {
		if (!this.passphrase) {
			throw new Error('Passphrase not set');
		}
		return cjs.AES.decrypt(encryptedText, this.passphrase).toString(cjs.enc.Utf8);
	}
}

export default StringEncryptor;
