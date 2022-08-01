export default class Currency {
    id: string;
    isoMark: string;
    symbol: string;
    name?: string;
    isDeletable?: boolean;

    constructor (id: string, iso: string, symbol: string) {
      this.id = id
      this.isoMark = iso
      this.symbol = symbol
    }
}
