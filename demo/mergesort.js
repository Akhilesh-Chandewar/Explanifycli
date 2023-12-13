function mergeSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }
  
    // Split the array into two halves
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
  
    // Recursively sort each half
    const leftSorted = mergeSort(left);
    const rightSorted = mergeSort(right);
  
    // Merge the sorted halves
    return merge(leftSorted, rightSorted);
  }
  
  function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;
  
    // Compare elements from the left and right arrays and merge them in sorted order
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }
  
    // If there are any remaining elements in the left array, add them to the result
    while (leftIndex < left.length) {
      result.push(left[leftIndex]);
      leftIndex++;
    }
  
    // If there are any remaining elements in the right array, add them to the result
    while (rightIndex < right.length) {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  
    return result;
  }
  
  // Example usage:
  const unsortedArray = [5, 2, 9, 1, 5, 6];
  const sortedArray = mergeSort(unsortedArray);
  console.log(sortedArray);
  