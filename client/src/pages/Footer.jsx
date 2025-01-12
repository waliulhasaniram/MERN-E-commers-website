const Footer =()=>{
    const date = new Date()
    return <>
        <div className="footer">
            <p>Copyright goes to Md. waliul Hasan {date.getFullYear()}</p>
        </div>
    </>
}

export default Footer