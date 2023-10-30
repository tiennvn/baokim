var playBtn = document.getElementById('play-button')
if (playBtn) {
  document.getElementById('play-button').addEventListener('click', function() {
    document.querySelector('.bg-modal').style.display = 'flex';
  });

  document.querySelector('.close').addEventListener('click', function() {
    document.querySelector('.bg-modal').style.display = 'none';
  });

  document.querySelector('.close-button').addEventListener('click', function() {
    document.querySelector('.bg-modal').style.display = 'none';
  });
}