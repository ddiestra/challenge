export function findSum(M: number[], N: number): number[] {
  if (!M || M.length < 2) {
    return [];
  }

  const map: { [key: number]: boolean } = {};

  for (const num of M) {
    const complement = N - num;
    
    if (map[complement]) {
      return [complement, num];
    }
    
    map[num] = true;
  }

  return [];
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.error('Missing arguments');
    process.exit(1);
  }
  
  let inputArray: number[];
  let targetSum: number;
  
  try {
    inputArray = JSON.parse(args[0]);
    
    if (!Array.isArray(inputArray) || !inputArray.every(num => typeof num === 'number')) {
      console.error('Invalid array format');
      process.exit(1);
    }
  } catch (error) {
    console.error('Invalid array format');
    process.exit(1);
  }
  
  const parsedSum = parseInt(args[1], 10);
  if (isNaN(parsedSum)) {
    console.error('Invalid target sum');
    process.exit(1);
  }
  targetSum = parsedSum;
  
  const result = findSum(inputArray, targetSum);

  console.log('Result: ', result)
}

main();