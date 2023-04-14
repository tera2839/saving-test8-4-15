import React, { useRef, useState } from 'react'
import "./Help.css"
import HomeIcon from '@mui/icons-material/Home';
import AddCardIcon from '@mui/icons-material/AddCard';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import emailjs from '@emailjs/browser';

const Help = () => {

  const [open, setOpen] = useState("explanation-content")
  const [reform, setReform] = useState("help-open")
  const [active, setActive] = useState(false)
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")

  const handleOpen = () => {
    if(!active) {
      setActive(true)
      setOpen("explanation-content open")
      setReform("help-open re")
    } else {
      setActive(false)
      setOpen("explanation-content")
      setReform("help-open")
    }
  }
   const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_tz2c2pl', 'template_k1310ai', form.current, 'KQ1QBcQ6P7NJfZMWt')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
    e.target.reset()
  }

  return (
    <div className='helps' >
      <div className='help-title'>
        <h1>ヘルプ</h1>
        <QuestionMarkIcon className='title-icon' />
      </div>
      <div className='help-nav'>
        <a href="#" className='help-nav-button'>ホームの使い方</a>
        <a href="#" className='help-nav-button'>目標の使い方</a>
        <a href="#" className='help-nav-button'>出費の使い方</a>
        <a href="#menber-help" className='help-nav-button'>メンバーの使い方</a>
        <a href="#calender-help" className='help-nav-button'>カレンダーの使い方</a>
        <a href="#q-help" className='help-nav-button'>お問い合わせ</a>
      </div>

      <div className='explanation'>
        <div className='explanation-title'>
          <h1>初めての方</h1>
          <div className={reform} onClick={handleOpen}>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className={open}>
          <p>家計簿アプリsavingへようこそ! このwebアプリでは、
             複数人（1人～4人推奨）で一つの目標に向かって貯金をしたり、
             日々の出費を確認することができます。</p>
             <h2>始め方</h2>
          <p>まず初めに<span className='bold'>目標</span>で何を目標にするか決めましょう。名前と金額を入力して追加して下さい。</p>
          <p>次に<span className='bold'>メンバー</span>で
          メンバーを追加しましょう。メンバーを追加しなければ誰が何をしたのかわからなくなるので必ず追加しましょう（1人の場合でも追加推奨）</p>
          <p>ここまで終了したらあとは<span className='bold'>出費</span>を追加したり、<span className='bold'>貯金</span>をして目標まで頑張りましょう!  各ページの使い方の詳細はヘルプのページ上部の○○の使い方を確認ください</p>
        </div>
      </div>

      <div className='help-contents'>
        <div className='help-text'>
          <div className='help-sub-title'>
            <HomeIcon className='help-icon' />
            <h2>ホームについて</h2>
          </div>
          <div className='help-content'>
            <p>ホームのページでは、出費と貯金をまとめた
              情報を見ることができます
            </p>
          </div>
        </div>

        <div className='help-text'>
          <div className='help-sub-title'>
            <SportsScoreIcon className='help-icon' />
            <h2>目標について</h2>
          </div>
          <div className='help-content'>
            <p>まず初めにこの目標のページで目標をセットします。
              目標の名前、金額を決めて追加することで、その他のページをご利用いただけます。
              一度設定した目標は変更はできず、削除しかできないので
              ご了承ください。
            </p>
          </div>
        </div>

        <div className='help-text'>
          <div className='help-sub-title'>
            <AddCardIcon className='help-icon' />
            <h2>出費について</h2>
          </div>
          <div className='help-content'>
            <p>出費のページでは普段の生活の出費を追加して
              管理することができます。
              出費の追加と書いてある下の欄から名前、金額を入力
              し、追加すると書いてあるボタン
              を押すと新しい出費を追加することができます。
              総合の出費や最も大きい出費などが確認できます
            </p>
          </div>
        </div>

        <div className='help-text' id="menber-help" >
          <div className='help-sub-title'>
            <PersonAddIcon className='help-icon' />
            <h2>メンバーについて</h2>
          </div>
          <div className='help-content'>
            <p>メンバーのページでは現在のメンバーの追加、削除が
              できます。savingでは、1つの目標に対して自分を含め
              4人までメンバーを追加することができます。貯金の名前にメンバーを指定することができるようになります。メンバーそれぞれの貯金額も見れるようになります
            </p>
          </div>
        </div>

        <div className='help-text' id="calender-help" >
          <div className='help-sub-title'>
            <EventNoteIcon className='help-icon' />
            <h2>貯金について</h2>
          </div>
          <div className='help-content'>
            <p>貯金のページでは日時、金額、メンバーを指定し、貯金するをクリックすることによって、日付ごとに貯金することができます。
            その他、貯金の合計額の確認、削除などができます。
            </p>
          </div>
        </div>

        <div className='help-q' id="q-help" >
          <div className='help-sub-title'>
            <h2>お問い合わせ</h2>
            <p>質問や意見などはこちらからお問い合わせをお願いします。</p>
          </div>
          <div className='help-footer'>
            <form className='help-form' ref={form} onSubmit={handleSubmit}>
              <div className='help-name'>
                <p>お名前</p>
                <input placeholder='名前' type="text" name="user_name" />
              </div>
              <div className='help-name'>
                <p>メールアドレス</p>
                <input placeholder='メールアドレス'  type="email" name="user_email" />
              </div>
              <div className='help-question'>
                <p>お問い合わせ内容</p>
                <textarea rows="4" cols="30" placeholder='内容'  name="message" ></textarea>
              </div>
              <div className='help-submit'>
                <button className='submit-button' type='submit'>送信</button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Help