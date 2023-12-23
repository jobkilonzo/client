import { proxy } from "valtio";

const state = proxy({
    intro: true,
    color:'#EFBD48',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './threejs.png',
    fullDcal: './threejs.png'
})

export default state