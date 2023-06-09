import React, { useEffect, useCallback, useState, useRef } from "react";
import styles from "./index.module.scss";

interface InputTaskProps {
  id: string;
  title: string;
  onDone: (id: string) => void;
  onEdited: (id: string, title: string) => void;
  onRemove: (id: string) => void;
}
export const InputTask: React.FC<InputTaskProps> = ({
  id,
  title,
  onDone,
  onEdited,
  onRemove,
}) => {
  const [checked, setChecked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [value, setValue] = useState(title);
  const editTitleInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isEditMode) {
      editTitleInputRef?.current?.focus();
    }
  }, [isEditMode]);
  return (
    <div className={styles.inputTask}>
      <label className={styles.inputTaskLabel}>
        <input
          type="checkbox"
          disabled={isEditMode}
          checked={checked}
          className={styles.inputTaskCheckbox}
          onChange={(event) => {
            setChecked(event.target.checked);
            if (event.target.checked) {
              // onDone(id);
            }
          }}
        />
        {isEditMode ? (
          <input
            value={value}
            ref={editTitleInputRef}
            onChange={(event) => {
              setValue(event.target.value);
            }}
            onKeyDown={(event) => {
              onEdited(id, value);
              setIsEditMode(false);
            }}
            className={styles.inputTaskTitleEdit}
          />
        ) : (
          <h3 className={styles.inputTaskTitle}>{title}</h3>
        )}
      </label>

      {isEditMode ? (
        <button
          aria-label="Save"
          className={styles.inputTaskSave}
          onClick={() => {
            onEdited(id, value);
            setIsEditMode(false);
          }}
        />
      ) : (
        <button
          aria-label="Edit"
          className={styles.inputTaskEdit}
          onClick={() => {
            setIsEditMode(true);
          }}
        />
      )}
      <button
        aria-label="Remove"
        className={styles.inputTaskRemove}
        onClick={() => {
          onRemove(id);
        }}
      />
    </div>
  );
};
