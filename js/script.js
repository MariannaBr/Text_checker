function calculate_sentences() {
    let input = document.getElementById('placetext').value;
    let sentences = /(([^\.\!\?\:])(\n+))|(([\.\!\?\:])(\n*))/g;
    let num_sentences = input.match(sentences);
    if (num_sentences == null) {
      return 0;
    }
    let sum_sentences = num_sentences.length;
    return sum_sentences
  }
  
  function calculate_words() {
    let input = document.getElementById('placetext').value;
    let words = /\w+/g;
    let num_words = input.match(words);
    let sum_words = num_words.length;
    return [num_words, sum_words];
  }
  
  function calculate_char() {
    let input = calculate_words()[0];
    let sum_char = 0;
    for (word of input) {
      sum_char += word.length;
    }
    return sum_char;
  }
  
  function calculate_text() {
    let sentences = calculate_sentences();
    let words = calculate_words()[1];
    let char = calculate_char();
    let score_h = 0;
    let score = Math.ceil(4.71 * (char / words) + 0.5 * (words / sentences) - 21.43);
    document.getElementsByClassName('span')[0].innerHTML = Math.max(score, 2);
    console.log("char", char, "words", words);
    console.log("sent", sentences, "score", score);
    if (score <= 5) {
      score_h = (score * 33) / 5;
      return Math.max(score_h, 2);
    }
    else if (5 < score && score <= 7) {
      score_h = (score * 50) / 7;
      return score_h;
    }
    else if (7 < score && score <= 12) {
      score_h = (score * 66) / 12;
      return score_h;
    }
    else if (score > 12) {
      score_h = (score * 66) / 12;
      return Math.min(score_h, 100);
    }
  }
  
  function show_scale() {
    let result = calculate_text();
    let score_height = 100 - result;
    document.getElementsByClassName('span')[0].style.height = score_height+'%';
  }
  
  document.getElementById('check').onclick = show_scale;
  