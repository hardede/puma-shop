export interface Legend {
  display: boolean;
  position: string;
}

export interface Options {
  legend: Legend;
}

export interface Dataset {
  label: string;
  backgroundColor: string;
  data: number[];
}

export interface ChartTypes {
  options: Options;
  labels: string[];
  datasets: Dataset[];
}
