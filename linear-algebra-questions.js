(function(){
  'use strict';
  const bank=window.EmberTextbook,questions=window.EmberMathQuestions;
  for(const [section,items]of Object.entries(bank.solutions)){
    // Keep the established entries and saved-answer identifiers, then include
    // any source exercise that was absent from the earlier abbreviated bank.
    for(const [number,question]of Object.entries(questions?.[section]||{})){
      if(items.some(item=>item.number===number))continue;
      if(!question.text||!question.title||!question.steps?.length||question.answer===undefined)
        throw new Error('Incomplete additional mathematics exercise '+section+' '+number);
      items.push({number,title:question.title,steps:question.steps,answer:question.answer});
    }
    for(const item of items){
      const question=questions?.[section]?.[item.number];
      if(!question?.text)throw new Error('Missing full mathematics question '+section+' '+item.number);
      item.prompt=question.text;
      item.textbookQuestion=true;
      item.questionReference=question.reference||'';
      item.questionFigures=question.figures||[];
      if(question.title)item.title=question.title;
      if(question.steps)item.steps=question.steps;
      if(question.answer!==undefined)item.answer=question.answer;
    }
  }
})();
