import SimpleContract from '../../build/contracts/SimpleContract.json'
import getWeb3 from './getWeb3'

import contract from 'truffle-contract'

class instantiateContract {
    web3 = {}

    static setWeb3() {
        getWeb3
            .then(results => {
            this.web3 = results.web3
        })
            .catch(() => {
                console.log('Error finding web3.')
            })
    }

    static setValue(val) {
        var simpleContract = contract(SimpleContract)
        simpleContract.setProvider(this.web3.currentProvider)

        this
            .web3
            .eth
            .getAccounts((error, accounts) => {
                simpleContract
                    .deployed()
                    .then((instance) => {
                        return instance.setData(val, {from: accounts[0]})
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            })
    }

    static getValue() {
        return new Promise((resolve, reject) => {
            var simpleContract = contract(SimpleContract)
            simpleContract.setProvider(this.web3.currentProvider)

            this
                .web3
                .eth
                .getAccounts((error, accounts) => {
                    simpleContract
                        .deployed()
                        .then((instance) => {
                            return instance
                                .getData
                                .call({from: accounts[0]})
                        })
                        .then((result) => {
                            resolve(result.c[0])
                        })
                        .catch((error) => {
                            console.error(error);
                        })
                })
        })
    }
}
export default instantiateContract