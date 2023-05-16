import React, { useEffect, useRef, useState } from 'react';

import PostTemplatesWrapper, { PostTemplateWrapper1, PostTemplateWrapper2, PostTemplateWrapper3, PostTemplateWrapper4 } from './PostTemplates.styles';
import { Button, Heading, Pane, Paragraph } from 'evergreen-ui';

declare interface IPostTemplatesProps {
  posts: any[];
  productName: string;
  productDescription: string;
  productType: string;
  file: any;
  getImage: any;
}

const PostTemplates: React.FC<IPostTemplatesProps> = 
  ({posts, productName, productDescription, productType, file, getImage}) => {

  const [temp, setTemp] = useState(false);

  useEffect(() => {
    setTemp(true);
  }, []);
  
  return (
  <PostTemplatesWrapper data-testid="PostTemplates">
    <h2>Generated Social Media Post</h2>
    <hr/>
    <PostTemplate1 post={posts[0]} productName={productName} 
      productDescription={productDescription} productType={productType}
      file={file} getImage={getImage} />


    <PostTemplate2 post={posts[1]} productName={productName} 
      productDescription={productDescription} productType={productType}
      file={file} getImage={getImage} />
    
    <PostTemplate3 post={posts[2]} productName={productName} 
      productDescription={productDescription} productType={productType}
      file={file} getImage={getImage} />

    <PostTemplate4 post={posts[3]} productName={productName} 
      productDescription={productDescription} productType={productType}
      file={file} getImage={getImage} />
  </PostTemplatesWrapper>
)};


interface IPostTemplateProps {
  post: any;
  productName: string;
  productDescription: string;
  productType: string;
  file: any;
  getImage: any;
}

export const PostTemplate1: React.FC<IPostTemplateProps> = ({post, productName, productDescription, productType, file, getImage}) => {
  const ref = useRef(null);

  return (
    <PostTemplateWrapper1>
      <Pane background='#fff' width={900} style={{margin: "0 auto"}} padding={20}>
        <Paragraph>{post?.text}</Paragraph>
        
        <Pane ref={ref} width={800} padding={20} style={{background: post?.backgroundGradientCss }} className='productImageWrapper'>
          <div style={{width: '100%'}}>
            <Heading className='tagline' fontFamily={post?.font} color={post?.textColor}>{post?.tagline}</Heading>
          </div>
          <Heading className='title' fontFamily={post?.font} color={post?.textColor}>{productName}</Heading>

          <img className='productImage' alt="post 1" src={URL.createObjectURL(file)} />
        </Pane>

        <Button onClick={() => getImage(ref)}>Download</Button>
      </Pane>
    </PostTemplateWrapper1>
  )
}

export const PostTemplate2: React.FC<IPostTemplateProps> = ({post, productName, productDescription, productType, file, getImage}) => {
  const ref = useRef(null);
  
  return (
    <PostTemplateWrapper2>
      <Pane background='#fff' width={900} style={{margin: "0 auto"}} padding={20}>
        <Paragraph>{post?.text}</Paragraph>

        <Pane width={800} marginRight="auto" marginLeft="auto">
          <Pane ref={ref} width={800} padding={0} backgroundColor={post?.backgroundGradientCss} className='productImageWrapper2' background='#fff'>
            <div className='left'>
              <Heading className='tagline2' fontFamily={post?.font}>{post?.tagline}</Heading>
              <ul className='benefits' style={{fontFamily: post?.font}}>
                {post?.benefits?.map((benefit: string) => (
                  <li className='benefit'  key={benefit}>&#10004; {benefit}</li>
                ))}
              </ul>
            </div>
            <div style={{background: post?.backgroundGradientCss}} className='right'>
              <img className='productImage2' alt="post 2" src={URL.createObjectURL(file)} />
              <Heading className='title2' fontFamily={post?.font} color={post?.textColor}>{productName}</Heading>
            </div>
          </Pane>

          <Button onClick={() => getImage(ref)}>Download</Button>
        </Pane>

      </Pane>
    </PostTemplateWrapper2>
  )
}

export const PostTemplate3: React.FC<IPostTemplateProps> = ({post, productName, productDescription, productType, file, getImage}) => {
  const ref = useRef(null);

  return (
    <PostTemplateWrapper3>
      <Pane background='#fff' width={900} style={{margin: "0 auto"}} padding={20}>
        <Paragraph>{post?.text}</Paragraph>

        <Pane ref={ref} width={800} padding={20} className='productImageWrapper'>
          <img className='productImage' alt="post 3" src={URL.createObjectURL(file)} />
          <div className="overlay" style={{background: post?.backgroundGradientCss}}>
            <Heading className='title' fontFamily={post?.font} color={post?.textColor}>{productName}</Heading>
            <Heading className='tagline' fontFamily={post?.font} color={post?.textColor}>{post?.tagline}</Heading>
          </div>

        </Pane>
      
        <Button onClick={() => getImage(ref)}>Download</Button>
      </Pane>
    </PostTemplateWrapper3>
  )
}

export const PostTemplate4: React.FC<IPostTemplateProps> = ({post, productName, productDescription, productType, file, getImage}) => {
  const ref = useRef(null);

  return (
    <PostTemplateWrapper4>
      <Pane background='#fff' width={900} style={{margin: "0 auto"}} padding={20}>
        <Paragraph>{post?.text}</Paragraph>
        
        <Pane ref={ref} width={800} padding={20} className='productImageWrapper'>
          <div className='details'>
            <Heading className='tagline' fontFamily={post?.font}>{post?.tagline}</Heading>
            <Heading className='title' fontFamily={post?.font}>{productName}</Heading>

            <ul className='benefits' style={{fontFamily: post?.font}}>
              {post?.benefits?.map((benefit: string) => (
                <li className='benefit'  key={benefit}>&#10004; {benefit}</li>
              ))}
            </ul>
          </div>

          <div className='blob' style={{background: post?.backgroundGradientCss, borderRadius: post?.borderRadius }}>
            <img className='productImage' alt="post 1" src={URL.createObjectURL(file)} />
          </div>
        </Pane>

        <Button onClick={() => getImage(ref)}>Download</Button>
      </Pane>
    </PostTemplateWrapper4>
  )
}

export default PostTemplates;
