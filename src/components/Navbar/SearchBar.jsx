// import { useState, useEffect } from "react";
// import { FaSearch } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { getProducts } from "../../api/prdoucts.api";
// import { motion } from "framer-motion";

// const SearchBar = () => {
//   const [showSearch, setShowSearch] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const products = await getProducts();
//       setSearchResults(products);
//     };

//     fetchProducts();
//   }, []);

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);

//     const filteredProducts = searchResults.filter(
//       (product) =>
//         product.productName
//           .toLowerCase()
//           .includes(e.target.value.toLowerCase()) ||
//         product.categoryName
//           .toLowerCase()
//           .includes(e.target.value.toLowerCase())
//     );

//     setSearchResults(filteredProducts);
//   };

//   return (
//     <div className="relative hidden lg:flex items-center">
//       <motion.div
//         whileHover={{ scale: 1.2 }}
//         className="text-DarkColor relative"
//       >
//         <FaSearch
//           size={25}
//           className="text-DarkColor cursor-pointer"
//           onClick={() => setShowSearch(!showSearch)}
//         />
//       </motion.div>
//       {showSearch && (
//         <div className="absolute bottom-0.5 left-10 mb-2 transform translate-y-1/2">
//           <input
//             type="text"
//             className="border outline-none bg-white border-ExtraDarkColor rounded-3xl py-2 p-3 w-60"
//             placeholder="Search products..."
//             value={searchQuery}
//             onChange={handleSearch}
//           />
//           {searchQuery && (
//             <div className="absolute z-10 bg-white shadow-lg border mt-2 w-60">
//               {searchResults.map((product) => (
//                 <div
//                   key={product.id}
//                   className="p-2 hover:bg-gray-100 cursor-pointer"
//                   onClick={() => {
//                     setShowSearch(false);
//                     navigate(`/product/${product.id}`);
//                   }}
//                 >
//                   {product.productName}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchBar;

import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../api/prdoucts.api";
import { motion } from "framer-motion";

// Trie Node class
class TrieNode {
  constructor() {
    this.children = {};
    this.products = []; // Store products that match this node
    this.isEndOfWord = false;
  }
}

// Trie class
class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  // Insert product name and category into the Trie
  insert(product) {
    const insertWord = (word) => {
      let node = this.root;
      for (let char of word) {
        if (!node.children[char]) {
          node.children[char] = new TrieNode();
        }
        node = node.children[char];
        node.products.push(product); // Add the product at each node of the word
      }
      node.isEndOfWord = true;
    };

    insertWord(product.productName.toLowerCase());
    insertWord(product.categoryName.toLowerCase());
  }

  // Search products by prefix
  searchPrefix(prefix) {
    let node = this.root;
    for (let char of prefix) {
      if (!node.children[char]) {
        return []; // No products match this prefix
      }
      node = node.children[char];
    }
    return node.products; // Return products that match the prefix
  }
}

const SearchBar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [trie, setTrie] = useState(new Trie()); // Initialize Trie
  const navigate = useNavigate();

  // Insert products into the Trie
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();

      const trieInstance = new Trie();
      products.forEach((product) => {
        trieInstance.insert(product); // Insert product into Trie
      });
      setTrie(trieInstance);
    };

    fetchProducts();
  }, []);

  // Handle search using Trie for prefix-based search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      // Get products that match the prefix
      const results = trie.searchPrefix(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="relative hidden lg:flex items-center">
      <motion.div
        whileHover={{ scale: 1.2 }}
        className="text-DarkColor relative"
      >
        <FaSearch
          size={25}
          className="text-DarkColor cursor-pointer"
          onClick={() => setShowSearch(!showSearch)}
        />
      </motion.div>
      {showSearch && (
        <div className="absolute bottom-0.5 left-10 mb-2 transform translate-y-1/2">
          <input
            type="text"
            className="border outline-none bg-white border-ExtraDarkColor rounded-3xl py-2 p-3 w-60"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearch}
          />
          {searchQuery && (
            <div className="absolute z-10 bg-white shadow-lg border mt-2 w-60">
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setShowSearch(false);
                    navigate(`/product/${product.id}`);
                  }}
                >
                  {product.productName}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
