import { useEffect, useState } from 'react';



const catDogClassif = () =>  {
  const imageMimeType = /image\/(png|jpg|jpeg)/i;
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [label, setLabel] = useState(null)

  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
    setLabel('Loading')
  }

  async function loaded(reader) {
    const response = await fetch('https://krushna-space1.hf.space/api/predict', {
      method: "POST", body: JSON.stringify({ "data": [reader] }),
      headers: { "Content-Type": "application/json" }
    });
    const json = await response.json();
    setLabel(json['data'][0]['confidences'][0]['label'])
    console.log(123)
  }

  useEffect(() => {
    console.log(123)
    let fileReader, isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result)
        }
      }
      fileReader.readAsDataURL(file);
      loaded(fileDataURL)
    }
    if (fileDataURL) {
      console.log(1234)
      const temp = fileDataURL
      console.log(temp)
      loaded(temp)
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    }

  }, [file]);

  return (
    <>
      <div>..</div>
      <div>..</div>
      <div>..</div>
      <div>..</div>
      <form>
        <p>
          <label htmlFor='image'> Browse images  </label>
          <input
            type="file"
            id='image'
            accept='.png, .jpg, .jpeg'
            onChange={changeHandler}
          />
        </p>
        <p>
          <input type="submit" label="Upload" />
        </p>
      </form>
      {fileDataURL ?
        <div className="img-preview-wrapper">
          {
            <img src={fileDataURL} alt="preview" />
          }
          <h1>{label}</h1>
        </div> : null}
    </>
  );
}

export default catDogClassif