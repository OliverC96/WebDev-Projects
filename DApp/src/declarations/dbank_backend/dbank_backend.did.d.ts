import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'compound' : ActorMethod<[], undefined>,
  'deposit' : ActorMethod<[number], undefined>,
  'getBalance' : ActorMethod<[], number>,
  'withdraw' : ActorMethod<[number], undefined>,
}
