obj = document.getElementById("submit");
obj.addEventListener("click", Run);

console.log(obj.innerHTML);


async function Run(){
    item = await document.getElementById("test");
    item.innerHTML += "test";
}