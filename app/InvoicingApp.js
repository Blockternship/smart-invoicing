import Aragon, { providers } from '@aragon/client'

class InvoicingApp {
  app = new Aragon(new providers.WindowMessage(window.parent));

  collectEstimation(amount) {
    return new Promise((resolve, reject) => {
      this.app
        .call('collectEstimation', amount)
        .first()
        // .map(value => parseInt(value, 10))
        .subscribe(resolve, reject)
    })
  }

  async createRequestAsPayee(amount, payer, data) {
    const amountWei = web3.toWei(amount, 'ether');
    const fee = await this.collectEstimation(amountWei);
    console.log('amountWei', amountWei, 'fee', fee);
    this.app.createRequestAsPayee(
      [amountWei], payer, web3.toHex(data || ''),
      {value: web3.toHex(fee)}
    );
    // {gas: web3.toHex(100000), gasPrice: web3.toHex(20 * 1e9), value: web3.toHex(fee)})
  }
}

export default new InvoicingApp();
