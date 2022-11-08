const teclas = document.querySelectorAll('button');
const screen = document.getElementById('operations');
let pressedNumber = '';

teclas.forEach((button) => {
  //  we add a 'click' listener for each button
  button.addEventListener('click', () => {
    screen.innerHTML = button.textContent;
    pressedNumber = button.textContent;
  //   alert(button.id);
  });
});











//click any button and recognize the pressed key
//when clicking on a button, show the value on the screen
//