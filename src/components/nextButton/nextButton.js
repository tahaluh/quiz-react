import "./nextButton.css";

export default function NextButton(props) {
    return (
        <button className="NewQuestion--Button" onClick={props.newQuestion}>Próxima Pergunta</button>
    )
}
