"use client";
import { scrapeAndStoreProduct } from '@/lib/actions';
import React, { FormEvent, useState } from 'react';

const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;


    if (hostname.includes('amazon.com') ||
     hostname.includes('amazon.')||
     hostname.includes('amazon.in') ||
     hostname.endsWith('amazon') 
      ) {

      return true;
    }
  } catch (error) {

    return false;
  }

  return false;
}

export const Searchbar = () => {

  const [searchPrompt, setSearchPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidAmazonProductURL(searchPrompt);


    if (!isValidLink) return alert ('Please Provide a Valid Amazon Product URL');

    try {
      setIsLoading(true);


      //scrape the product page
      const product = await scrapeAndStoreProduct(searchPrompt);
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }
    

  }
  
  return (
    <form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>
      <input
        className='searchbar-input'
        type='text'
        placeholder='Search for products'
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
      />
      <button 
      type="submit" 
      className='searchbar-btn'
      disabled={searchPrompt === ''}>
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default Searchbar;
