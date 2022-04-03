let objectCounter = 0;

const createObject = ()=> {
    objectCounter++;
    window.dispatchEvent(new CustomEvent("object:new", { detail: { id: objectCounter} }));
}

const start = () => {
    setInterval(createObject, 100);
}

export { start };
