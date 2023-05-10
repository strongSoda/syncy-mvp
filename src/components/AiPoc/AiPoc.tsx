import React, { useEffect, useRef, useState } from 'react';

import AiPocWrapper from './AiPoc.styles';
import { Button, FileCard, FilePicker, FileUploader, Heading, Pane, Paragraph, TextInputField } from 'evergreen-ui';
import query from 'global/ai/model';
import { useScreenshot } from "use-react-screenshot";

// declare interface IAiPocProps {}

const AiPoc: React.FC = () => {
  const [temp, setTemp] = useState(false);
  const [files, setFiles] = React.useState<any>([])
  const [fileRejections, setFileRejections] = React.useState<any>([])
  const handleChange = React.useCallback((files) => setFiles([files[0]]), [])
  const handleRejected = React.useCallback((fileRejections) => setFileRejections([fileRejections[0]]), [])
  const handleRemove = React.useCallback(() => {
    setFiles([])
    setFileRejections([])
  }, [])

  const [text, setText] = useState<string>("");
  const [tagline, setTagline] = useState<string>("");
  const [benefits, setBenefits] = useState<string[]>([]);
  const [showImage, setShowImage] = useState(false);
  const [productName, setProductName] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [productType, setProductType] = useState<string>("");

  const [ss, takeScreenShot] = useScreenshot();

  const ref = useRef(null);
  const ref2 = useRef(null);
  const getImage = (ref: any) => takeScreenShot(ref?.current);

  useEffect(() => {
    setTemp(true);
  }, []);

  useEffect(() => {
    if(ss) {
      // download screenshot ss
      const link = document.createElement('a');
      link.href = ss;
      link.setAttribute('download', 'image.png');

      document.body.appendChild(link);

      link.click();

    }
  }, [ss]);

  const getText = async () => {
    console.log('here');
    
    const res = await query(`
    You are an expert social media content creator responsible for creating content to promote any brand's products on social media.

    Given the product details below the line generate 
    
    1. A social media post that promotes the product. The post should be 1-2 sentences long and should be written in the style of the brand's social media posts.
    2. Tagline foe the product banner. At most 5 words.
    3. 5 Adjectives of the product. Each with at most 3 words. Each is cool and catchy.

    return the post and the tagline in JSON format with the following keys:

    {
      "post": "The post goes here",
      "tagline": "The tagline goes here",
      "benefits": ["benefit 1", "benefit 2", "benefit 3"]
    }
    
    -----------------
    Product name: ${productName}
    Product description: ${productDescription}
    Product type: ${productType}
    -----------------

    Make the post witty and catchy.
    The sentiment of the post should be positive. The post should be written to be viral. Do not include any hashtags or links in the post.

    At most 50 words.

    `, 100);

    const data = JSON.parse(res as string);

    console.log(data);
    setText(data?.post);
    setTagline(data?.tagline);
    setBenefits(data?.benefits);
    setShowImage(true);
  }

  const generate = () => {
    console.log('here');
    
    // TODO: generate text with 
    getText()
  }

  
  return (
  <AiPocWrapper data-testid="AiPoc">

    <Pane  alignItems="center" justifyContent="center" width={900} style={{margin: "0 auto"}}>
      <h1>Generate social media post with Syncy GPT</h1>
      <Paragraph>Syncy GPT is a text generation model that can generate text based on a prompt. It is trained on a large corpus of social media posts and can generate text in the style of the training data.</Paragraph>

      <br />
      {/* Input field for product name */}
      <TextInputField label="Product name" placeholder="Enter product name" 
        onChange={(e: any) => setProductName(e.target.value)}
        value={productName}
      />
      <TextInputField label="What is your product?" placeholder="Shoe, Coffee, Nailpolish, etc." 
        onChange={(e: any) => setProductType(e.target.value)}
        value={productType}
      />

      {/* Input field for product description */}
      <TextInputField label="Product description" placeholder="Enter product description"
        onChange={(e: any) => setProductDescription(e.target.value)}
        value={productDescription}
      />

    <Pane maxWidth={654}>
      <FileUploader
        label="Upload File"
        description="You can upload 1 file. File can be up to 50 MB."
        maxSizeInBytes={50 * 1024 ** 2}
        maxFiles={1}
        onChange={handleChange}
        onRejected={handleRejected}
        renderFile={(file) => {
          const { name, size, type } = file
          const fileRejection = fileRejections.find((fileRejection: any) => fileRejection.file === file)
          const { message } = fileRejection || {}
          return (
            <FileCard
              key={name}
              isInvalid={fileRejection != null}
              name={name}
              onRemove={handleRemove}
              sizeInBytes={size}
              type={type}
              validationMessage={message}
            />
          )
        }}
        values={files}
      />
    </Pane>

    <Button marginBottom={20} onClick={generate}>Generate</Button>

    </Pane>

      {showImage && 
      <>
      <Pane background='#fff' width={900} style={{margin: "0 auto"}} padding={20}>
      <h2>Generated Social Media Post</h2>
      <hr />
      <Paragraph>{text}</Paragraph>
      
        <Pane ref={ref} width={800} padding={20} className='productImageWrapper' background='yellow'>
          <div style={{width: '100%'}}>
            <Heading className='tagline' color="#fff">{tagline}</Heading>
          </div>
          <Heading className='title' color="#fff">{productName}</Heading>

          <img className='productImage' src={URL.createObjectURL(files[0])} />
        </Pane>

        <Button onClick={() => getImage(ref)}>Download</Button>
      </Pane>


      <Pane ref={ref2} width={900} padding={0} className='productImageWrapper2' background='#fff'>
        <div className='left'>
          <Heading className='tagline2'>{tagline}</Heading>
          <ul className='benefits'>
            {benefits?.map((benefit: string) => (
              <li className='benefit' key={benefit}>&#10004; {benefit}</li>
            ))}
          </ul>
        </div>
        <div className='right'>
          <img className='productImage2' src={URL.createObjectURL(files[0])} />
          <Heading className='title2'>{productName}</Heading>
        </div>
      </Pane>

      <Button onClick={() => getImage(ref2)}>Download</Button>
      </>
      }

    
  </AiPocWrapper>
)};

export default AiPoc;
