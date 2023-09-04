var l=Object.defineProperty;var c=(r,e,i)=>e in r?l(r,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):r[e]=i;var s=(r,e,i)=>(c(r,typeof e!="symbol"?e+"":e,i),i);import{a as u,R as p}from"./chunk-cb6af00f.js";import{E as d}from"./chunk-d5188a53.js";const m=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function i(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerpolicy&&(n.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?n.credentials="include":t.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(t){if(t.ep)return;t.ep=!0;const n=i(t);fetch(t.href,n)}};m();const h=`<main id="reado--component">
  <h1 class="reado--h1">Reado</h1>
  <h2 class="reado--h2">Adjust your reading preferences</h2>
  <div class="reado--grid-container">
    <div class="reado--grid-item">
      <h3>Font Size</h3>
      <input type="range" min="1" max="100" value="40" class="reado--slider reado" id="fontSize">
      <span id="fontSizeValue" class="reado">40</span>
    </div>
    <div class="reado--grid-item">
      <h3>Font Family</h3>
      <select name="font-family" id="fontFamily" value="serif">
        <option value="serif">Serif</option>
        <option value="sans-serif">Sans-serif</option>
        <option value="inherit">Inherit</option>
      </select>
    </div>
    <div class="reado--grid-item">
      <h3>Line Height</h3>
      <input type="range" min="1" max="100" value="66" class="reado--slider" id="lineHeight">
      <span id="lineHeightValue">66</span>
    </div>
    <div class="reado--grid-item">
      <h3>Word Spacing</h3>
      <input type="range" min="1" max="100" value="11" class="reado--slider" id="wordSpacing">
      <span id="wordSpacingValue">11</span>
    </div>
    <div class="reado--grid-item">
      <h3>Text Align</h3>
      <select name="text-align" id="textAlign" value="left">
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </select>
    </div>
    <div class="reado--grid-item">
      <h3>Opacity</h3>
      <input type="range" min="1" max="100" value="100" class="reado--slider" id="backgroundOpacity">
      <span id="backgroundOpacityValue">100</span>
    </div>
    <div class="reado--grid-item">
      <h3>Background Color</h3>
      <input type="color" id="textBackgroundColor" name="text-background-color" value="#ededed">
    </div>
    <div class="reado--grid-item">
      <h3>Text Color</h3>
      <input type="color" id="textColor" name="text-color" value="#222222" >
    </div>
  </div>
</main>
`;class g{constructor(e){s(this,"inputs");this.inputs=e}async setItem(e,i){await chrome.storage.local.set({[e]:i})}async getItem(e){return(await chrome.storage.local.get([e]))[e]}updateValues(){this.inputs.forEach(e=>{const i=document.getElementById(e),o=document.getElementById(`${e}Value`);i&&this.setItem(e,i.value).then(()=>chrome.tabs.query({active:!0,currentWindow:!0},t=>{chrome.tabs.sendMessage(t[0].id,{message:d.STYLE_UPDATE,key:e,value:i.value})})),o&&(o.innerHTML=i.value)})}updateSingleValueAndPreview(e){const i=document.getElementById(e),o=document.getElementById(`${e}Value`);this.getItem(e).then(t=>{!t||(i&&(i.value=t),o&&(o.innerHTML=t))})}initialize(){document.querySelector(p).innerHTML=h,document.addEventListener("change",e=>{e.target&&this.inputs.includes(e.target.id)&&this.updateValues()}),document.addEventListener("DOMContentLoaded",()=>{this.inputs.forEach(e=>{this.updateSingleValueAndPreview(e)})}),chrome.runtime.onMessage.addListener((e,i)=>{e.message===d.CLICKED_ON_CONTEXT_MENU&&this.inputs.forEach(o=>{this.updateSingleValueAndPreview(o)})})}intial(){this.initialize()}}const f=new g(u);f.intial();
