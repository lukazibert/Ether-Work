import { BrowserProvider } from 'ethers';

class MetaMaskService {
    constructor() {
        if (!window.ethereum) {
            throw new Error('MetaMask is not installed!');
        }

        this.provider = new BrowserProvider(window.ethereum);
        this.signer = null;
    }

    // Request MetaMask account access
    async connect() {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            this.signer = await this.provider.getSigner();
            return await this.getAccount();
        } catch (error) {
            console.error('User rejected the request:', error);
            throw new Error('User rejected the request');
        }
    }

    // Get the connected account address
    async getAccount() {
        if (!this.signer) throw new Error('No signer available. Please connect to MetaMask.');
        return await this.signer.getAddress();
    }

    // Get the current network
    async getNetwork() {
        return await this.provider.getNetwork();
    }

    // Sign a transaction
    async signTransaction(transaction) {
        if (!this.signer) throw new Error('No signer available. Please connect to MetaMask.');
        
        try {
            const txResponse = await this.signer.sendTransaction(transaction);
            return await txResponse.wait();
        } catch (error) {
            console.error('Transaction failed:', error);
            throw new Error('Transaction failed');
        }
    }

    // Sign a message
    async signMessage(message) {
        if (!this.signer) throw new Error('No signer available. Please connect to MetaMask.');
        
        try {
            const signature = await this.signer.signMessage(message);
            return signature;
        } catch (error) {
            console.error('Message signing failed:', error);
            throw new Error('Message signing failed');
        }
    }

    // Get the balance of the connected account
    async getBalance() {
        if (!this.signer) throw new Error('No signer available. Please connect to MetaMask.');
        
        const address = await this.getAccount();
        return await this.provider.getBalance(address);
    }
}

export default new MetaMaskService();
