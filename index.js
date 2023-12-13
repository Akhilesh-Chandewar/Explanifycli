#!/usr/bin/env node

import fs from 'fs';
import { config } from "dotenv";
config();

import { ConversationChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  MessagesPlaceholder,
} from "langchain/prompts";
import { BufferMemory } from "langchain/memory";

const chat = new ChatOpenAI({ maxConcurrency: 5 });

const chatPrompt = ChatPromptTemplate.fromMessages([
    new MessagesPlaceholder("history"),
    HumanMessagePromptTemplate.fromTemplate("{input}"),
  ]);

const chain = new ConversationChain({
  memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
  prompt: chatPrompt,
  llm: chat,
});

function getCode(filePath) {
  try {
    const data = fs.readFileSync(filePath, { encoding: 'utf8' });
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

process.argv.forEach(async (val, index) => {
  if(val === "explain"){
    const filePath = process.argv[index+1].toString()
    const fileData = getCode(filePath);
    console.log(val)
    const response = await chain.call({
      input: `${val} ${fileData}` ,
    });
    console.log(response);
  }
  else{
    const response = await chain.call({
      input: `${val}` ,
    });
    console.log(response);
  }
});
