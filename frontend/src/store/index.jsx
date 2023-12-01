import {proxy} from "valtio";

const state = proxy({
    intro : true,
    color : '#0b052b',
    isLogoTexture : true,
    isFullTexture : false,
    logoDecal : './threejs.png',
    fullDecal : './threejs.png',


});

export default state;