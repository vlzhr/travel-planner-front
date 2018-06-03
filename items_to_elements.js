function to_element(item_n) {
    const item = items[item_n];
    const el = document.createElement("div");
    const percent = (+item_n) / items.length;
    const y = offset + size/4 - size/4 * Math.sin(2*3.14 * percent);
    const x = offset + size/4 - size/4 * Math.cos(2*3.14 * percent);

    el.style.position = "absolute";
    el.style.top = y+"px";
    el.style.left = x+"px";
    el.style.content = 'url('+item+')';
    el.style.width =  items.length > 18 ? size / items.length*2 + "px" : "100px";
    el.classList.add("item");
    return el;
}