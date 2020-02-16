//Simple render function which takes the target DOM and inserts the markup from Screen.
//Post-render is the functionality associated with the inserted screen.

export default function render(dom, screen){
    return new Promise((resolve, reject)=>{
      document.getElementById(dom).innerHTML = screen.preRender;
      resolve();
    }).then(()=>{screen.postRender();})
}
