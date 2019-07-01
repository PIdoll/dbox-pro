import React from 'react';


import ZmExamda from 'zmexamda';
import {
  sortData,
  matchData,
  // fillData,
  //  matchData2,
  choiceData,
  fillBlank,
  shortAnswer,
  complexData,
  fillData2,
  // sortData3,
  fillBlank2,
  choiceDataForTeach,
} from './question';
// import style from './index.less';

export default function AnswerQuestion() {
  return (
    <div style={{ margin: '18px' }}>
      <eg-title>1、教资题库选择题</eg-title>
      <ZmExamda
        interactive
        optionListLayout='oneline-between'
        handleChange={(res) => console.log(res)}
        species='er'
        index='1、'
        options={['title', 'references', 'problem', 'answerList', 'analysis']}
        question={choiceDataForTeach}
      />
      <eg-title>2、单选题</eg-title>
      <ZmExamda
        question={choiceData}
        index='1、'
        options={['title', { key: 'answerList', label: '答案:' }, { key: 'analysis', label: '这货不叫解析：' }]}
        optionListLayout='oneline-between'
        extendsDom={{
          node: <div>GGGGGGGGGG</div>,
          pos: 'title'
        }}
      />
      <eg-title>3、填空题</eg-title>
      <ZmExamda
        interactive
        question={fillBlank}
        index='2'
        options={['title', 'answerList']}
        optionListLayout='oneline'
      />
      <eg-title>4、填空题2</eg-title>
      <ZmExamda
        question={fillBlank2}
        index={5}
        options={['title', 'answerList']}
      />
      <eg-title>5、简答题</eg-title>
      <ZmExamda
        interactive
        question={shortAnswer}
        index='3'
        options={['title', 'answerList']}
      />
      <eg-title>6、复合题</eg-title>
      <ZmExamda
        question={complexData}
        index={4}
        options={[
          'title',
          {
            key: 'children',
            groupIndexType: '(__$$__)',
            extendsDom: {
              nodeList: [
                <div>children -- 01 自定义</div>,
                <div>children -- 02 自定义</div>,
                <div>children -- 03 自定义</div>,
              ],
              pos: 'end'
            }
          },
          'answerList',
        ]}
      />
      <eg-title>6、分类题</eg-title>
      <ZmExamda
        question={sortData.data}
        index={6}
        interactive
      />
      <eg-title>7、配对题</eg-title>
      <ZmExamda
        question={matchData.data}
        index={8}
        handleChange={() => console.log('1')}
        interactive
      />
      <eg-title>8、选词填空题</eg-title>
      <ZmExamda
        question={fillData2.data}
        index={11}
        interactive
        extendsDom={{
          node: <div>外部传入DOM 或 组件，嘎嘎嘎！</div>,
          pos: 'end'
        }}
      />
    </div>
  );
}
