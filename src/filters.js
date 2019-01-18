import Vue from 'vue'

Vue.filter('timeFormatter', (val)=>{
    let m = Math.floor(val/60).toString().padStart(2,'0');
    let s = Math.floor(val - m * 60).toString().padStart(2,'0');
    return `${m}:${s}`;
})