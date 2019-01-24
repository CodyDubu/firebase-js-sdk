/**
 * Copyright 2018 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ResourcePath } from '../model/path';
import { SortedSet } from '../util/sorted_set';
import { PersistenceTransaction } from './persistence';
import { PersistencePromise } from './persistence_promise';

/**
 * Represents a set of indexes that are used to execute queries efficiently.
 *
 * Currently the only index is a [collection id] => [parent path] index, used
 * to execute Collection Group queries. When we implement property indexing in
 * the future, the way this interface is structured and used will very possibly
 * change.
 */
export interface IndexManager {
  /**
   * Creates an index entry mapping the collectionId (last segment of the path)
   * to the parent path (either the containing document location or the empty
   * path for root-level collections). Index entries can be retrieved via
   * getCollectionParents().
   */
  addToCollectionParentIndex(
    transaction: PersistenceTransaction,
    collectionPath: ResourcePath
  ): PersistencePromise<void>;

  /**
   * Retrieves all parent locations containing the given collectionId, as a
   * set of paths (each path being either a document location or the empty
   * path for a root-level collection).
   */
  getCollectionParents(
    transaction: PersistenceTransaction,
    collectionId: string
  ): PersistencePromise<SortedSet<ResourcePath>>;
}
