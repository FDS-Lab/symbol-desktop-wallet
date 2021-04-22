import { DerivationPathValidator } from '@/core/validation/validators';
import { SymbolLedger } from '@/core/utils/Ledger';
import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import { NetworkType } from 'symbol-sdk/dist/src/model/network/NetworkType';
import { params } from 'vee-validate/dist/types/rules/alpha';
const TrezorConnect = window['TrezorConnect'];

export class TrezorService {
    private transport;

    /**
     * constructor
     * @param networkType network type
     */
    constructor(public readonly networkType: NetworkType) {
        TrezorConnect.init({
            connectSrc: 'http://localhost:8088/',
            lazyLoad: true, // this param will prevent iframe injection until TrezorConnect.method will be called
            manifest: {
                email: 'developer@xyz.com',
                appUrl: 'http://your.application.com',
            }
        })
    }

    // public async isAppSupported() {
    //     try {
    //         this.transport = await this.openTransport();
    //         const symbolLedger = new SymbolLedger(this.transport, 'XYM');
    //         const result = await symbolLedger.isAppSupported();
    //         return result;
    //     } catch (error) {
    //         throw this.formatError(error);
    //     } finally {
    //         await this.closeTransport();
    //     }
    // }

    // public async getAccount(path: string, display: boolean, isOptinLedgerWallet: boolean) {
    //     try {
    //         if (!DerivationPathValidator.validate(path, this.networkType)) {
    //             const errorMessage = 'Invalid derivation path: ' + path;
    //             throw new Error(errorMessage);
    //         }
    //         this.transport = await this.openTransport();
    //         const symbolLedger = new SymbolLedger(this.transport, 'XYM');
    //         const result = await symbolLedger.getAccount(path, this.networkType, display, false, isOptinLedgerWallet);
    //         return result;
    //     } catch (error) {
    //         throw this.formatError(error);
    //     } finally {
    //         await this.closeTransport();
    //     }
    // }

    public async getAccounts(paths: string[], display: boolean): Promise<string[]> {
        // Example: 
        // NEM2 Get multi public key:
        // TrezorConnect.nem2GetPublicKey({
        //     bundle: [
        //         { path: "m/44'/43'/0'/0'/0'", showOnTrezor: false }, // account 1
        //         { path: "m/44'/43'/1'/0'/0'", showOnTrezor: false }, // account 2
        //         { path: "m/44'/43'/2'/0'/0'", showOnTrezor: false }  // account 3
        //     ]
        // });
        // Result:
        // Success
        // {
        //     success: true,
        //     payload: [
        //         { public_key: string }, // account 1
        //         { public_key: string }, // account 2
        //         { public_key: string }, // account 3
        //     ]
        // }
        // Fail
        // {
        //     success: false,
        //     payload: {
        //         error: string // error message
        //     }
        // }

        for (const path of paths) {
            if (!DerivationPathValidator.validate(path, this.networkType)) {
                const errorMessage = 'Invalid derivation path: ' + path;
                throw new Error(errorMessage);
            }
        }
        console.log('paths', paths)
        const param = {
            bundle: paths.map(path => ({ path, showOnTrezor: !!display }))
        }
        const { success, payload } = await TrezorConnect.nem2GetPublicKey(param);
        // if (!success) throw payload.error;
        // const result = payload.map(elm => elm.public_key)
        // return result;
        // Tamping data for test
        return  ["2B7630F362A8C1E2966FB1732EB9BEDC4B2578D284A2F8AE8139CADB38638F61", "5C60560C2DA93DB0E29602812812479EEE32A7C7A1C51F827CBA23D20E5DD624", "2ABB9EC3F77D192905ADCAC45C8104FCE324F0D86348052AE8AFBAA7A4D319BA", "7074FEF7DDDBC51514AE6F879FC041C38D602175155BECABACD5D11999678357", "DEE20F6CC3BD6A28346084C4BD7C7FFEDFEC64981AD05A51C3005C37D2081DA0", "82A6AB14C6833D518E1EE4925BB9FB61B22A7095E9F6F136C2A0765AA2731986", "FB7351F1651DBD46748820115699A59D8B693CA4CA36074D9B4BAA0DCC5701E6", "FDB0E8D3AA2828C72DED9EB7FE13672F5C70D4B8420FAE80BA72B6A57A6A79A2", "32C594D70834F97352C6EC1FAD2BD2507C5C69A60127023C6003B99ED103B412", "EBB45A01EE55B1B58FEE3EA33A9E601631BDABF5A8419936D5EB5B95A25FD58F"]
    }

    // public async signTransaction(
    //     path: string,
    //     transferTransaction: any,
    //     networkGenerationHash: string,
    //     signerPublicKey: string,
    //     isOptinLedgerWallet: boolean,
    // ) {
    //     try {
    //         if (!DerivationPathValidator.validate(path, this.networkType)) {
    //             const errorMessage = 'Invalid derivation path: ' + path;
    //             throw new Error(errorMessage);
    //         }
    //         this.transport = await this.openTransport();
    //         const symbolLedger = new SymbolLedger(this.transport, 'XYM');
    //         const result = await symbolLedger.signTransaction(
    //             path,
    //             transferTransaction,
    //             networkGenerationHash,
    //             signerPublicKey,
    //             isOptinLedgerWallet,
    //         );
    //         return result;
    //     } catch (error) {
    //         throw this.formatError(error);
    //     } finally {
    //         await this.closeTransport();
    //     }
    // }

    // public async signCosignatureTransaction(
    //     path: string,
    //     cosignatureTransaction: any,
    //     signerPublicKey: string,
    //     isOptinLedgerWallet: boolean,
    // ) {
    //     try {
    //         if (!DerivationPathValidator.validate(path, this.networkType)) {
    //             const errorMessage = 'Invalid derivation path: ' + path;
    //             throw new Error(errorMessage);
    //         }
    //         this.transport = await this.openTransport();
    //         const symbolLedger = new SymbolLedger(this.transport, 'XYM');
    //         const result = await symbolLedger.signCosignatureTransaction(
    //             path,
    //             cosignatureTransaction,
    //             signerPublicKey,
    //             isOptinLedgerWallet,
    //         );
    //         return result;
    //     } catch (error) {
    //         throw this.formatError(error);
    //     } finally {
    //         await this.closeTransport();
    //     }
    // }
}
