import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Popover, Button } from "antd";
import { EllipsisOutlined, EyeOutlined } from "@ant-design/icons";
import { Emoji } from "emoji-mart";
import reactStringReplace from "react-string-replace";

import { convertTime, isAudio } from "../../helpers";

import waveSvg from "../../assets/img/wave.svg";
import playSvg from "../../assets/img/play.svg";
import pauseSvg from "../../assets/img/pause.svg";

import { Time, ReadedIcon, DefaultAvatar } from "..";

import "./message.scss";

const MessageAudio = ({ audioSrc }) => {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [currentTime, setCurrentTime] = React.useState(0);

    const audioElem = React.useRef(null);

    const togglePlay = () => {
        if (!isPlaying) {
            audioElem.current.play();
        } else {
            audioElem.current.pause();
        }
    };

    React.useEffect(() => {
        audioElem.current.volume = "0.5";
        audioElem.current.addEventListener(
            "playing",
            () => {
                setIsPlaying(true);
            },
            false,
        );
        audioElem.current.addEventListener(
            "ended",
            () => {
                setIsPlaying(false);
                setProgress(0);
                setCurrentTime(0);
            },
            false,
        );
        audioElem.current.addEventListener(
            "pause",
            () => {
                setIsPlaying(false);
            },
            false,
        );
        audioElem.current.addEventListener("timeupdate", () => {
            const duration =
                (audioElem.current && audioElem.current.duration) || 0;
            setCurrentTime(audioElem.current.currentTime);
            setProgress(
                (audioElem.current.currentTime / duration) * 100 +
                    duration * 0.5,
            );
        });
    }, []);

    return (
        <div className="message__audio">
            <audio ref={audioElem} src={audioSrc} preload="auto" />
            <div
                className="message__audio-progress"
                style={{ width: progress + "%" }}
            />
            <div className="message__audio-info">
                <div className="message__audio-btn">
                    <button onClick={togglePlay}>
                        {isPlaying ? (
                            <img src={pauseSvg} alt="pauseSvg" />
                        ) : (
                            <img src={playSvg} alt="playSvg" />
                        )}
                    </button>
                </div>
                <div className="message__audio-wave">
                    <img src={waveSvg} alt="waveSvg" />
                </div>
                <span className="message__audio-duration">
                    {convertTime(currentTime)}
                </span>
            </div>
        </div>
    );
};

const Message = ({
    avatar,
    confirm_hash,
    name,
    message_text,
    timestamp,
    isMe,
    is_readed,
    attachment,
    isTyping,
    deleteMessage,
    setPreviewImage,
}) => {
    const renderAttachment = (item) => {
        if (item.ext !== "webm") {
            return (
                <div
                    key={item.attachment_id}
                    onClick={() => setPreviewImage(item.url)}
                    className="message__attachments-item">
                    <div className="message__attachments-item-overlay">
                        <EyeOutlined style={{ color: "white", fontSize: 18 }} />
                    </div>

                    <img src={item.url} alt={item.original_name} />
                </div>
            );
        } else {
            return (
                <MessageAudio key={item.attachment_id} audioSrc={item.url} />
            );
        }
    };
    return (
        <div
            className={classNames("message", {
                "message--isme": isMe,
                "message--istyping": isTyping,
                "message--is-audio": isAudio(attachment),
                "message--image":
                    !isAudio(attachment) &&
                    attachment &&
                    attachment.length === 1 &&
                    !message_text,
            })}>
            <div className="message__content">
                <ReadedIcon isMe={isMe} isReaded={is_readed} />
                {isMe ? (
                    <Popover
                        placement="left"
                        content={
                            <div>
                                <a onClick={deleteMessage}>Удалить</a>
                            </div>
                        }
                        trigger="click">
                        <div className="message__icon-actions">
                            <Button
                                shape="circle"
                                icon={<EllipsisOutlined />}
                            />
                        </div>
                    </Popover>
                ) : null}
                <div className="message__avatar">
                    <DefaultAvatar
                        user={{
                            avatar: avatar,
                            hash: confirm_hash,
                            name: name,
                        }}
                    />
                </div>
                <div className="message__info">
                    {(message_text || isTyping) && (
                        <div className="message__bubble--wrapper">
                            <div className="message__bubble">
                                {message_text && (
                                    <p className="message__text">
                                        {reactStringReplace(
                                            message_text,
                                            /:(.+?):/g,
                                            (match, i) => (
                                                <Emoji
                                                    key={i}
                                                    emoji={match}
                                                    set="apple"
                                                    size={20}
                                                />
                                            ),
                                        )}
                                    </p>
                                )}
                                {isTyping && (
                                    <div className="message__typing">
                                        <span />
                                        <span />
                                        <span />
                                    </div>
                                )}
                                {false && <MessageAudio audioSrc={null} />}
                            </div>
                            {timestamp && (
                                <span className="message__date">
                                    <Time date={timestamp} />
                                </span>
                            )}
                        </div>
                    )}
                    {attachment && (
                        <div className="message__attachments">
                            {attachment.map((item) => renderAttachment(item))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

Message.defaultProps = {
    user: {},
};

Message.propTypes = {
    avatar: PropTypes.string,
    text: PropTypes.string,
    date: PropTypes.string,
    user: PropTypes.object,
    attachments: PropTypes.array,
    isTyping: PropTypes.bool,
    isMe: PropTypes.bool,
    isReaded: PropTypes.bool,
    audio: PropTypes.string,
};

export default Message;
