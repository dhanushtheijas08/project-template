import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  doc,
  getDoc,
  WhereFilterOp,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";

type Response<T = any> = {
  success: boolean;
  message: string;
  data?: T;
};

export const createDocument = async <T extends Record<string, any>>(
  collectionName: string,
  data: T
): Promise<Response<string>> => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return {
      success: true,
      message: "Document created successfully.",
      data: docRef.id,
    };
  } catch (error) {
    console.error("Error creating document:", error);
    return {
      success: false,
      message: `Failed to create document: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
};

export const getDocuments = async <T>(
  collectionName: string
): Promise<Response<T[]>> => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as T[];
    return {
      success: true,
      message: "Documents fetched successfully.",
      data: documents,
    };
  } catch (error) {
    console.error("Error getting documents:", error);
    return {
      success: false,
      message: `Failed to get documents: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
};

export const getDocumentById = async <T>(
  collectionName: string,
  docId: string
): Promise<Response<T>> => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        success: true,
        message: "Document fetched successfully.",
        data: { id: docSnap.id, ...docSnap.data() } as T,
      };
    } else {
      return {
        success: false,
        message: "No document found with the given ID.",
      };
    }
  } catch (error) {
    console.error("Error getting document by ID:", error);
    return {
      success: false,
      message: `Failed to get document: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
};

export const updateDocument = async <T>(
  collectionName: string,
  docId: string,
  data: Partial<T>
): Promise<Response<void>> => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
    return {
      success: true,
      message: "Document updated successfully.",
    };
  } catch (error) {
    console.error("Error updating document:", error);
    return {
      success: false,
      message: `Failed to update document: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
};

export const deleteDocument = async (
  collectionName: string,
  docId: string
): Promise<Response<void>> => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return {
      success: true,
      message: "Document deleted successfully.",
    };
  } catch (error) {
    console.error("Error deleting document:", error);
    return {
      success: false,
      message: `Failed to delete document: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
};

export type WhereCondition = [
  field: string,
  operator: WhereFilterOp,
  value: any
];

interface QueryOptions {
  whereConditions?: WhereCondition[];
  orderByField?: string;
  orderDirection?: "asc" | "desc";
  limitValue?: number;
}

export const getDocumentsWithFilters = async <T>(
  collectionName: string,
  options?: QueryOptions
): Promise<Response<T[]>> => {
  try {
    const collectionRef = collection(db, collectionName);

    let q = query(collectionRef);

    // Apply where conditions if provided
    if (options?.whereConditions) {
      options.whereConditions.forEach(([field, operator, value]) => {
        q = query(q, where(field, operator, value));
      });
    }

    // Apply orderBy if provided
    if (options?.orderByField) {
      q = query(
        q,
        orderBy(options.orderByField, options.orderDirection || "asc")
      );
    }

    // Apply limit if provided
    if (options?.limitValue) {
      q = query(q, limit(options.limitValue));
    }

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as T[];
      return {
        success: true,
        message: "Documents fetched successfully.",
        data,
      };
    } else {
      return {
        success: false,
        message: "No matching documents found.",
      };
    }
  } catch (error) {
    console.error("Error getting documents:", error);
    return {
      success: false,
      message: `Failed to get documents: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
};
