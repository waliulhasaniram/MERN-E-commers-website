const Contact =()=>{
    return <>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14601.383596378653!2d90.34606226256942!3d23.806295990171773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0c5074ec8db%3A0x1450dad46461cbe8!2sMirpur-2%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1729368781744!5m2!1sen!2sbd" width="99.5%" height="450" referrerpolicy="no-referrer-when-downgrade"></iframe>

<div className="reg_container">

    <div>
        <img className="regImage" src="/image/contactimg.png" alt="this is a registration image" width="500" height="500"/>
    </div>
    <div className="regForm">
        <form >
            <h1>Contact us </h1>
            <div className="input_div">
                <label>username: </label><br/>
                <input type="text" name="username" placeholder="username" id="username"  required />
            </div>
            <div className="input_div">
                <label>Email: </label><br/>
                <input type="email" name="email" placeholder="email" id="email"  required />
            </div>
            <div className="input_div">
                <label>Message: </label><br/>
                <textarea type="text" name="message" placeholder="message" id="message"  required></textarea>
            </div>
            <div className="input_div">
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>

</div> 
    </>
}
export default Contact