import { CommitmentLine } from './CommitmentLine';

export interface Commitments {
    expiry: number;
    commitment: CommitmentLine[];
}