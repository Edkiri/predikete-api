import { PhaseOptions } from 'src/tournaments/entities/phase.entity';
import { IGroupStage } from 'src/tournaments/models/group-stage.interface';
import { IPhase } from 'src/tournaments/models/phase.interface';

export const phases: IPhase[] = [
  { phase: PhaseOptions.EIGHTH_FINAL },
  { phase: PhaseOptions.QUARTERS_FINAL },
  { phase: PhaseOptions.SEMI_FINAL },
  { phase: PhaseOptions.THITD_AND_FOURTH },
  { phase: PhaseOptions.FINAL },
];

export const groupStages: IGroupStage[] = [
  {
    name: 'A',
    teams: [
      { name: 'Uruguay' },
      { name: 'Mexico' },
      { name: 'South Africa' },
      { name: 'French' },
    ],
  },
  {
    name: 'B',
    teams: [
      { name: 'Argentina' },
      { name: 'Republic of Korea' },
      { name: 'Greece' },
      { name: 'Nigeria' },
    ],
  },
  {
    name: 'C',
    teams: [
      { name: 'USA' },
      { name: 'England' },
      { name: 'Slovenia' },
      { name: 'Algeria' },
    ],
  },
  {
    name: 'D',
    teams: [
      { name: 'Germany' },
      { name: 'Ghana' },
      { name: 'Australia' },
      { name: 'Serbia' },
    ],
  },
  {
    name: 'E',
    teams: [
      { name: 'Netherlans' },
      { name: 'Japan' },
      { name: 'Denmark' },
      { name: 'Cameroon' },
    ],
  },
  {
    name: 'F',
    teams: [
      { name: 'Paraguay' },
      { name: 'Slovakia' },
      { name: 'New Zealand' },
      { name: 'Italy' },
    ],
  },
  {
    name: 'G',
    teams: [
      { name: 'Brasil' },
      { name: 'Portugal' },
      { name: 'Ivory Coast' },
      { name: 'DPR of Korea' },
    ],
  },
  {
    name: 'H',
    teams: [
      { name: 'Spain' },
      { name: 'Chile' },
      { name: 'Switzerland' },
      { name: 'Honduras' },
    ],
  },
];
