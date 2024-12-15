import { Line } from "./Line";

export type CommitmentStatus = "PENDING" | "COMPLETED" | "FAILED";

export interface CommitmentLine {
    id: number;
    line: Line;
    status: CommitmentStatus;
}