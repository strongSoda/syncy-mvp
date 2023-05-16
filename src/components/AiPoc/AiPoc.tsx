import React, { useEffect, useRef, useState } from 'react';

import AiPocWrapper from './AiPoc.styles';
import { Button, FileCard, FilePicker, FileUploader, Heading, Pane, Paragraph, TextInputField } from 'evergreen-ui';
import query from 'global/ai/model';
import { useScreenshot } from "use-react-screenshot";
import CSSVARIABLES from 'global/constants/variables';
import Syncy from '../../assets/images/syncy.png';
import PostTemplates from 'components/PostTemplates/PostTemplates.lazy';

// declare interface IAiPocProps {}

function splitOnce(str: string, sep: string) {
  const idx = str.indexOf(sep);
  return [str.slice(0, idx), str.slice(idx+1)];
}

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

  const [posts, setPosts] = useState<any[]>([]);

  const [ss, takeScreenShot] = useScreenshot();
  
  const getImage = (ref: any) => {
    console.log('here', ref?.current);
    takeScreenShot(ref?.current)
  };

  useEffect(() => {
    setTemp(true);
  }, []);

  useEffect(() => {
    if(ss) {
      // download screenshot ss
      const link = document.createElement('a');
      link.href = ss;
      // create random image name
      link.setAttribute('download', `syncy-${new Date().getTime()}.png`);

      document.body.appendChild(link);

      link.click();

    }
  }, [ss]);

  const getText = async () => {
    console.log('here');
    
    const res = await query(`
    You are an expert social media content creator responsible for creating content to promote any brand's products on social media.

    Given the product details below the line generate a valid json array for 4 social media posts for the product. If you cant return a valid json array return an empty array.

    Return the posts in JSON format with the following keys:

    [
      {
      "text": "The post text goes here",
      "tagline": "The tagline goes here",
      "backgroundGradientCss": "linear-gradient(to top, #30cfd0 0%, #330867 100%)",
      "textColor": "white",
      "font": ""
    },
    {
      "text": "The post text goes here",  
      "tagline": "The tagline goes here",
      "benefits": ["benefit 1", "benefit 2", "benefit 3"],
      "backgroundGradientCss": "linear-gradient(105deg, white 25%, yellow 25%)",
      "textColor": "white",
      "font": ""
    },
    {
      "text": "The post text goes here",
      "tagline": "The tagline goes here",
      "backgroundGradientCss": "linear-gradient(rgb(72,0,72,0.8), rgb(192,72,72,0.8))",
      "textColor": "white",
      "font": ""
    },
    {
      "text": "The post text goes here",
      "tagline": "The tagline goes here",
      "benefits": ["benefit 1", "benefit 2", "benefit 3", "benefit 4", "benefit 5"],
      "backgroundGradientCss": "linear-gradient(to top, #30cfd0 0%, #330867 100%)",
      "textColor": "white",
      "font": ""
    }
    ]
    
    -----------------
    Product name: ${productName}
    Product description: ${productDescription}
    Product type: ${productType}
    -----------------

    Make each post witty and catchy.
    The sentiment of the all posts should be positive. The posts should be written to be viral. Do not include any hashtags or links in the posts.

    1. Each post's text is at most 50 words and should be written in the style of the brand's social media posts.
    2. Tagline for the product banner. At most 5 words.
    3. 5 Adjectives of the product. Each adjective with at most 3 words. Each is cool and catchy. Return as the benfits only in the second post.
    4. The background gradient for the product banner. Return as a css string. Different for each post. Randomly generated colors.
     For the second post the pecentage of the gradient and the first color(white) should be same as provided but randomize the second color.
    5. The text-color should be white or black depending on the background gradient.
    6. The font should be a random font from the list of fonts provided below. Different for each post.
    7. The background gradient for the 3rd post should have opacity of 0.8. Randomly generated colors.

    Fonts:
      1. 'Montez'
      2. 'Montserrat'
      3. 'Raleway'
      4. 'Permanent Marker'

    `, 500);

    console.log(res);
    const processed = splitOnce(res as string, '[')[1];
    console.log(processed);
    
    const data = JSON.parse('[' + processed as string);

    console.log(data);

    setPosts(data);
    // setText(data?.post);
    // setTagline(data?.tagline);
    // setBenefits(data?.benefits);
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
      <Pane display="flex" padding={16} marginTop={24} background={CSSVARIABLES.COLORS.YELLOW_GREEN_1} borderRadius={3}>
        <img src={Syncy} alt="Syncy" width="50" height="50" />
        <Pane>
          <Heading size={800} flex={1} alignItems="center" display="flex">
            Syncy
          </Heading>
          <Heading size={400}>
            Where brands connect with quality micro-influencers
          </Heading>
        </Pane>
        <Pane>
        </Pane>
      </Pane>
      
      <Pane padding={20} background={CSSVARIABLES.COLORS.WHITE_0} borderRadius={3} marginTop={24}>
      <h1>Generate social media post with Syncy GPT</h1>
      {/* <Paragraph>Syncy GPT is a text generation model that can generate text based on a prompt. It is trained on a large corpus of social media posts and can generate text in the style of the training data.</Paragraph> */}

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

    <Button width={'100%'} intent='success' appearance='primary' marginBottom={20} onClick={generate}>Generate</Button>

    </Pane>

  </Pane>

      {showImage && 
      <>

      <PostTemplates 
        posts={posts}
        productName={productName} productDescription={productDescription} productType={productType}
        getImage={getImage}
        file={files[0]}
        />

      </>
      }

    
  </AiPocWrapper>
)};

export default AiPoc;
