export class KmaCoordConverter {
  constructor() {
    this.RE = 6371.00877; // 지구 반경(km)
    this.GRID = 5.0; // 격자 간격(km)
    this.SLAT1 = 30.0;
    this.SLAT2 = 60.0;
    this.OLON = 126.0;
    this.OLAT = 38.0;
    this.XO = 43;
    this.YO = 136;
    this.DEGRAD = Math.PI / 180.0;
    this.RADDEG = 180.0 / Math.PI;
  }

  convertToNx(lat, lon) {
    const re = this.RE / this.GRID;
    const slat1 = this.SLAT1 * this.DEGRAD;
    const slat2 = this.SLAT2 * this.DEGRAD;
    const olon = this.OLON * this.DEGRAD;
    const olat = this.OLAT * this.DEGRAD;

    let sn =
      Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
      Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);

    let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
    let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
    ro = (re * sf) / Math.pow(ro, sn);

    let ra = Math.tan(Math.PI * 0.25 + lat * this.DEGRAD * 0.5);
    ra = (re * sf) / Math.pow(ra, sn);
    let theta = lon * this.DEGRAD - olon;
    if (theta > Math.PI) theta -= 2.0 * Math.PI;
    if (theta < -Math.PI) theta += 2.0 * Math.PI;
    theta *= sn;

    const nx = Math.floor(ra * Math.sin(theta) + this.XO + 0.5);
    const ny = Math.floor(ro - ra * Math.cos(theta) + this.YO + 0.5);

    return { nx, ny };
  }
}
